import BrandComponent from "@/ui/components/shared/brand_c";
import LoginForm from "@/ui/components/login/login-form";
export default function LoginPageComponent() {
    return <div className="flex flex-col items-center justify-center gap-5 w-full">
        {/* BRAND COMPONENT */}
        <BrandComponent isSplashScreen={false} size="large" />
        {/* LOGIN FORM */}
        <div className="flex flex-col items-center justify-center gap-2 bg-white dark:bg-gray-600  w-[80%] md:w-[40%] max-w-2xl p-5 rounded-md shadow-md">
            <LoginForm />
        </div>
    </div>;
}

