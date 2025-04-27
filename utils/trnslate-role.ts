export const translateRole = (role: string, lang: 'AR' | 'EN') => {
    if (lang === 'AR') {
        switch (role) {
            case 'admin':
                return 'مدير';
            case 'controller':
                return 'متحكم';
            case 'teacher':
                return 'معلم';
            default:
                return 'مستخدم';
        }
    } else {
        switch (role) {
            case 'مدير':
                return 'admin';
            case 'متحكم':
                return 'controller';
            case 'مدرس':
                return 'teacher';
            default:
                return 'User';
        }
    }
}