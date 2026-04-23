import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  NotificationResponseDTO,
  NotificationCategory,
} from '../../../../core/models/notification.model';
import { NotificationService } from '../../../../core/services/notification.service';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-notifications-panel',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule],
  templateUrl: './notifications-panel.component.html',
  styleUrl: './notifications-panel.component.scss',
})
export class NotificationsPanelComponent implements OnInit {
  notifications: NotificationResponseDTO[] = [];
  currentPage = 0;
  pageSize = 10;
  recipientId: string | null = null;

  filterRead: boolean | null = null;
  filterCategory: NotificationCategory | null = null;

  unreadCount = 0;
  hasMore = true;

  categories = Object.values(NotificationCategory);
  categoryLabels: Record<NotificationCategory, string> = {
  [NotificationCategory.INFO]: 'Informação',
  [NotificationCategory.SUCCESS]: 'Sucesso',
  [NotificationCategory.WARNING]: 'Aviso',
  [NotificationCategory.ERROR]: 'Erro',
  [NotificationCategory.URGENT]: 'Urgente'
};

  constructor(
    private service: NotificationService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.userService.currentUser$.subscribe((user) => {
      if (user?.id) {
        this.recipientId = user.id;
        this.resetAndLoad();
        this.updateUnreadCount();
      }
    });

    if (!this.userService.getCurrentUserValue()) {
      this.userService.fetchCurrentUser().subscribe();
    }
  }

  resetAndLoad() {
    this.currentPage = 0;
    this.notifications = [];
    this.hasMore = true;
    this.loadNotifications();
  }

  applyFilter(status: boolean | null) {
    this.filterRead = status;
    this.resetAndLoad();
  }

  applyCategoryFilter(category: any) {
    this.filterCategory = category === 'ALL' ? null : category;
    this.resetAndLoad();
  }

  loadNotifications() {
    this.service
      .getNotifications(this.currentPage, this.pageSize, {
        recipientId: this.recipientId || undefined,
        isRead: this.filterRead ?? undefined,
        category: this.filterCategory || undefined,
        sortBy: 'createdAt',
        direction: 'DESC',
      })
      .subscribe({
        next: (page) => {
          const newNotifications = page.content;

          this.hasMore = !page.last;

          if (this.currentPage === 0) {
            this.notifications = newNotifications;
          } else {
            this.notifications = [...this.notifications, ...newNotifications];
          }
        },
        error: (err) => console.error('Erro:', err),
      });
  }

  updateUnreadCount() {
    if (this.recipientId) {
      this.service
        .getUnreadCount(this.recipientId)
        .subscribe((c) => (this.unreadCount = c));
    }
  }

  loadMore() {
    if (this.hasMore) {
      this.currentPage++;
      this.loadNotifications();
    }
  }

  markAsRead(id: string) {
    this.service.markAsRead(id).subscribe((updatedNotif) => {
      this.notifications = this.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n,
      );
      this.updateUnreadCount();
    });
  }
}
