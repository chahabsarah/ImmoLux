import { Component, OnInit } from '@angular/core';
import { AccountValidationRequest } from 'src/app/models/AccountValidationRequest';
import { User } from 'src/app/models/User';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: LocalService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    const token = localStorage.getItem('token');

    if (token) {
      this.userService.getAllUsers(token).subscribe(
        (data: User[]) => {
          this.users = data;
        },
        (error) => {
          console.error('Error fetching users:', error);
        }
      );
    } else {
      console.error('No token found in local storage.');
    }
  }

  deleteUser(id: number): void {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found');
      return;
    }

    this.userService.deleteUser(id, token).subscribe(
      response => {
        console.log('User deleted successfully');
        this.loadUsers();
      },
      error => {
        console.error('Error deleting user:', error);
      }
    );
  }

  changeUserStatus(userId: number, status: string): void {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found');
      return;
    }

    const request: AccountValidationRequest = {
      userId,
      status
    };

    this.userService.changeUserStatus(request, token).subscribe(
      response => {
        console.log('User status updated successfully');
        this.loadUsers();
      },
      error => {
        console.error('Error changing user status:', error);
      }
    );
  }
}
