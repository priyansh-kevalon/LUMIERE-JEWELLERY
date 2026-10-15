import PasswordReset from '../components/account/PasswordReset';

export default function ForgotPassword() {
  return (
    <main className="min-h-dvh bg-[#0d0d0d] pt-28 pb-20 sm:pt-32">
      <div className="mx-auto w-full max-w-[88rem] px-6 sm:px-10 lg:px-14">
        <div className="mx-auto max-w-[440px]">
          <div className="text-center">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#b99662]">
              Account
            </p>
            <h1 className="mt-2 font-serif text-[26px] font-normal leading-tight text-[#f0eae5] sm:text-[28px]">
              Reset Your Password
            </h1>
            <p className="mt-2 text-[13px] font-light leading-relaxed text-[#a7a19b]">
              We&rsquo;ll help you get back into your account in a few steps.
            </p>
          </div>

          <div className="mt-7 rounded-md border border-white/10 bg-[#141312] px-5 py-6">
            <PasswordReset />
          </div>
        </div>
      </div>
    </main>
  );
}
