import { Component, OnInit,HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../_auth/auth.service';

@Component({
    selector: 'app-payment-gateway',
    templateUrl: './payment-gateway.component.html',
    styleUrls: ['./payment-gateway.component.css']
})
export class PaymentGatewayComponent implements OnInit {
    // paymentMethod: any = 'Net Banking';
    // paymentOptions: string[] = ['Add Debit/Credit/ATM cards', 'Net Banking', 'Other UPI Apps', 'EMI']
    data: any;

    rzp1 :any;

    userData =  JSON.parse(localStorage.getItem('userData') || "{}");
 
 
 
    constructor(private location: Location, private router: Router,private auth :AuthService) {
        this.data = this.location.getState();
        if (Object.keys(this.data).length === 1) {
            this.router.navigate(['']);
        }
    }


    options = {
        "key": "rzp_test_whxWhDNwVSZBmz", // Enter the Key ID generated from the Dashboard
        "amount": "1000",
        "currency": "INR",
        "description": "Flight Ticket Fare",
        "image": "https://s3.amazonaws.com/rzp-mobile/images/rzp.png",
    
        "prefill":
        {
          "email": this.userData['emailId'],
          "contact": this.userData['mobile'],
        },

        config: {
            display: {
              blocks: {
                banks: {
                  name: 'All payment methods',
                  instruments: [
                    {
                      method: 'upi'
                    },
                    {
                      method: 'card'
                    },
                    {
                        method: 'wallet'
                    },
                    {
                        method: 'netbanking'
                    },
                    {
                        method: 'emi'
                    }
                  ],
                },
              },
              sequence: ['block.banks'],
              preferences: {
                show_default_blocks: false,
              },
            },
          },
          "handler": function (response: any) {
            var event = new CustomEvent("payment.success",
              {
                detail: response,
                bubbles: true,
                cancelable: true
              }
            );
            window.dispatchEvent(event);
          },
        };
        

    ngOnInit(): void {
    }

    getTotalAmount() : any{
        return this.data["flight-details"].fare * this.data["passenger-details"].length
   }


    confirmBooking() {
        this.options.amount = this.getTotalAmount() * 100 +"";
       
          this.rzp1 = new this.auth.getNativeWindow.Razorpay(this.options);
          // var rzp1 = new Razorpay(this.options);
          this.rzp1.open();
          this.rzp1.on('payment.failed', function (response: any) {
      
            console.log(response.error.code);
            console.log(response.error.description);
            console.log(response.error.source);
            console.log(response.error.step);
            console.log(response.error.reason);
            console.log(response.error.metadata.order_id);
            console.log(response.error.metadata.payment_id);
          }
          );
        }
        @HostListener('window:payment.success', ['$event'])
        onPaymentSuccess(event: any): void {
          console.log(event)
          this.router.navigate(['booking-status'], {
            state: {
                ...this.data, 'paymentMethod': event.gateway, 'fare': this.data["flight-details"].fare *
                    this.data["passenger-details"].length
            }
        });
        }
      
}
