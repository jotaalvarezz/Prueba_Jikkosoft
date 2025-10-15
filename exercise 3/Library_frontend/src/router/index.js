import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Books from '../views/Books/Books.vue'
import BookDetail from '../views/Books/BookDetail.vue'
import BookForm from '@/views/Books/BookForm.vue'
import Loans from '../views/Loans/Loans.vue'
import LoanForm from '../views/Loans/LoanForm.vue'
import Members from '../views/Members/Members.vue'
import MemberDetail from '../views/Members/MemberDetail.vue'
import MemberForm from '../views/Members/MemberForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    // Books Module
    {
      path: '/books',
      name: 'books',
      component: Books,
    },
    {
      path: '/books/create',
      name: 'book-create',
      component: BookForm,
    },
    {
      path: '/books/:id',
      name: 'book-detail',
      component: BookDetail,
    },
    {
      path: '/books/:id/edit',
      name: 'book-edit',
      component: BookForm,
    },
    // Loans Module
    {
      path: '/loans/create',
      name: 'loan-create',
      component: LoanForm,
    },
    {
      path: '/loans',
      name: 'loans',
      component: Loans,
    },
    // Members Module
    {
      path: '/members',
      name: 'members',
      component: Members,
    },
    {
      path: '/members/create',
      name: 'member-create',
      component: MemberForm,
    },
    {
      path: '/members/:id',
      name: 'member-detail',
      component: MemberDetail,
    },
    {
      path: '/members/:id/edit',
      name: 'member-edit',
      component: MemberForm,
    },
  ],
})

export default router
