import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },
    {
        id: 2,
        label: 'Painel de Controle',
        icon: 'ri-dashboard-line',
        link: '/'
    },
    {
        id: 3,
        label: 'Eventos',
        icon: 'ri-calendar-2-line',
        link: '/calendar'
    },
    {
        id: 5,
        label: 'Produtos',
        icon: 'ri-store-2-line',
        subItems: [
            {
                id: 6,
                label: 'Materiais',
                link: '/materiais',
                parentId: 5
            },
            {
                id: 8,
                label: 'Origem',
                link: '/materiais',
                parentId: 5
            },
            {
                id: 9,
                label: 'Vendas',
                link: '/ecommerce/customers',
                parentId: 5
            }
        ]
    },
    {
        id: 14,
        label: 'Fornecedores',
        icon: 'ri-mail-send-line',
        link: '/fornecedores'
    },
    {
        id: 15,
        label: 'Funcionários',
        icon: 'ri-artboard-2-line',
        link: '/funcionarios'
    },
    {
        id: 18,
        label: 'Clientes',
        icon: 'ri-account-circle-line',
        link: '/clientes'
    },
    {
        id: 23,
        label: 'histórico de Fornecedores',
        icon: 'ri-profile-line',
        link: '/histFornecedores'
    },
    {
        id: 32,
        label: 'histórico de Funcionários',
        icon: 'ri-profile-line',
        link: '/histFuncionarios'
    },
  
];
