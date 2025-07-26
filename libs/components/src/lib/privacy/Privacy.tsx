'use client';

export function PrivacyComponent() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-4 text-center">سیاست حفظ حریم خصوصی</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-12">
        با دونستن و قبول کردن این موارد بهمون کمک میکنی بهترین خدمات رو بهت ارائه بدیم دوست من 🤝
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">ورود به حساب کاربری</h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-medium mb-4">ورود با گوگل</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              با استفاده از گزینه ورود با گوگل، ما به اطلاعات پایه پروفایل گوگل شما دسترسی خواهیم داشت که شامل:
            </p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-center">
                <span className="ml-2">•</span>
                نام و نام خانوادگی
              </li>
              <li className="flex items-center">
                <span className="ml-2">•</span>
                آدرس ایمیل
              </li>
              <li className="flex items-center">
                <span className="ml-2">•</span>
                تصویر پروفایل
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-4">ورود با گیت‌هاب</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              با استفاده از گزینه ورود با گیت‌هاب، ما به اطلاعات پایه پروفایل گیت‌هاب شما دسترسی خواهیم داشت که شامل:
            </p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-center">
                <span className="ml-2">•</span>
                نام کاربری
              </li>
              <li className="flex items-center">
                <span className="ml-2">•</span>
                آدرس ایمیل
              </li>
              <li className="flex items-center">
                <span className="ml-2">•</span>
                تصویر پروفایل
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">اطلاعات تماس</h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-medium mb-4">شماره تلفن</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">شماره تلفن شما برای موارد زیر استفاده خواهد شد:</p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-center">
                <span className="ml-2">•</span>
                تایید هویت دو مرحله‌ای
              </li>
              <li className="flex items-center">
                <span className="ml-2">•</span>
                ارسال کد تایید
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-4">آدرس ایمیل</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">آدرس ایمیل شما برای موارد زیر استفاده خواهد شد:</p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-center">
                <span className="ml-2">•</span>
                ارسال اطلاعات حساب کاربری
              </li>
              <li className="flex items-center">
                <span className="ml-2">•</span>
                بازیابی رمز عبور
              </li>
              <li className="flex items-center">
                <span className="ml-2">•</span>
                ارسال اخبار و به‌روزرسانی‌ها (در صورت موافقت شما)
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">ارتباطات</h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-medium mb-4">پیام‌کوتاه</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">ما ممکن است در موارد زیر برای شما پیام‌کوتاه ارسال کنیم:</p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-center">
                <span className="ml-2">•</span>
                تایید شماره تلفن
              </li>
              <li className="flex items-center">
                <span className="ml-2">•</span>
                کد تایید دو مرحله‌ای
              </li>
              <li className="flex items-center">
                <span className="ml-2">•</span>
                اطلاع‌رسانی‌های مهم
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-4">ایمیل</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">ما ممکن است در موارد زیر برای شما ایمیل ارسال کنیم:</p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-center">
                <span className="ml-2">•</span>
                تایید آدرس ایمیل
              </li>
              <li className="flex items-center">
                <span className="ml-2">•</span>
                بازیابی رمز عبور
              </li>
              <li className="flex items-center">
                <span className="ml-2">•</span>
                به‌روزرسانی‌های سیستم
              </li>
              <li className="flex items-center">
                <span className="ml-2">•</span>
                خبرنامه (در صورت موافقت شما)
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">اطلاعات عمومی</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          این برنامه به عنوان یک سرویس وب در دسترس عموم قرار دارد. با استفاده از این برنامه، شما موافقت می‌کنید که:
        </p>
        <ul className="space-y-2 text-gray-600 dark:text-gray-400">
          <li className="flex items-center">
            <span className="ml-2">•</span>
            اطلاعات شما مطابق با قوانین حفاظت از داده‌ها ذخیره و پردازش می‌شود
          </li>
          <li className="flex items-center">
            <span className="ml-2">•</span>
            ما از کوکی‌ها و فناوری‌های مشابه برای بهبود تجربه کاربری استفاده می‌کنیم
          </li>
          <li className="flex items-center">
            <span className="ml-2">•</span>
            اطلاعات شما ممکن است در سرورهای خارج از کشور شما ذخیره شود
          </li>
          <li className="flex items-center">
            <span className="ml-2">•</span>
            شما می‌توانید در هر زمان درخواست حذف حساب کاربری خود را ارائه دهید
          </li>
          <li className="flex items-center">
            <span className="ml-2">•</span>
            ما متعهد به محافظت از اطلاعات شخصی شما هستیم و از استانداردهای امنیتی مناسب استفاده می‌کنیم
          </li>
        </ul>
      </section>
    </div>
  );
}
