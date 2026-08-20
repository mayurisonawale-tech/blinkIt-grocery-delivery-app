import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserHelperService } from '../services/user-helper.service';

interface Tile {
  icon: string;
  label: string;
}

interface Feature {
  icon: string;
  title: string;
  copy: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  isLoggedIn = false;

  private loginStatusSubscription?: Subscription;

  categories: Tile[] = [
    { icon: '🥬', label: 'Fresh Vegetables' },
    { icon: '🍎', label: 'Fruits' },
    { icon: '🥛', label: 'Dairy & Eggs' },
    { icon: '🍞', label: 'Bakery' },
    { icon: '🥤', label: 'Cold Drinks' },
    { icon: '🍿', label: 'Snacks' },
    { icon: '🧴', label: 'Personal Care' },
    { icon: '🧹', label: 'Home Essentials' }
  ];

  features: Feature[] = [
    {
      icon: '⚡',
      title: 'Delivered in minutes',
      copy: 'Stores stocked near you, so your order arrives while the kettle is still boiling.'
    },
    {
      icon: '🥗',
      title: 'Farm fresh, every day',
      copy: 'Produce sourced daily and quality-checked before it reaches your door.'
    },
    {
      icon: '🏷️',
      title: 'Prices that stay low',
      copy: 'Everyday value on thousands of products, with no surprise checkout fees.'
    },
    {
      icon: '↩️',
      title: 'Easy returns',
      copy: 'Not happy with an item? Flag it at delivery and we will make it right.'
    }
  ];

  constructor(private userHelperService: UserHelperService) { }

  ngOnInit(): void {
    this.loginStatusSubscription = this.userHelperService.userLoginStatusBehaviorSubject
      .subscribe((isUserLoggedIn: boolean) => {
        this.isLoggedIn = isUserLoggedIn;
      });
  }

  ngOnDestroy(): void {
    this.loginStatusSubscription?.unsubscribe();
  }
}
