export default {
    items: [
      {
        name: 'Dashboard',
        url: '/admin/dashboard',
        icon: 'icon-speedometer',
        
      },
    
      {
        name: 'Pups',
        url: '/admin/pup',
        icon: 'fa fa-paw fa-lg',
        children: [
          {
            name: 'Store',
            url: '/admin/pup/store',
            icon: 'fa fa-shopping-basket fa-lg',
          },
          
          {
            name: 'Ordered',
            url: '/admin/pup/ordered',
            icon: 'fa fa-cart-arrow-down fa-lg',
          },
          {
            name: 'Sold',
            url: '/admin/pup/sold',
            icon: 'fa fa-cart-arrow-down fa-lg',
          },

        ],
      },
     
      // {
      //   name: 'Monthly records',
      //   url: '/admin/review',
      //   icon: 'fa fa-inbox fa-lg',
      // },
      {
        name: 'Messages',
        url: '/admin/message',
        icon: 'fa fa-envelope-open fa-lg',
      },      
      // {
      //   name: 'Users',
      //   url: '/admin/customer',
      //   icon: 'fa fa-users fa-lg',
      // },
      // {
      //   name: 'Payment',
      //   url: '/admin/payment',
      //   icon: 'fa fa-money fa-lg',
      // },
    ],
  };
  