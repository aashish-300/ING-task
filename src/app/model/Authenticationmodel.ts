export interface RegisterModel {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  isActive?: boolean;
}

export interface loginModel {
  username: string;
  password: string;
}

export class LoginModel {
  private data!: RegisterModel;
  constructor(
    loginForm: string,
    serverData: RegisterModel,
    router: { navigate: (arg0: string[]) => void }
  ) {
    if (loginForm === serverData?.password) {
      console.log('server data',serverData)
      if (serverData.isActive) {
        sessionStorage.setItem('username', serverData.id);
        sessionStorage.setItem('role', serverData.role);
        if (serverData.role === 'salesperson') {
          router.navigate(['product']);
        } else {
          router.navigate(['dashboard']);
        }
      } else {
        alert('Please contact admin to activate');
      }
    } else {
      alert('invalid credentials');
    }
  }
}
