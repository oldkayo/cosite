# كيفية تشغيل الموقع مع PHP

## المشكلة
إذا ظهرت رسالة "خطأ في الخادم. تحقق من أن PHP يعمل بشكل صحيح"، فهذا يعني أن PHP لا يعمل أو أنك تفتح الملفات مباشرة من المتصفح (file://).

## الحلول

### الحل 1: استخدام خادم PHP المدمج (الأسهل)

1. افتح Terminal أو Command Prompt
2. انتقل إلى مجلد المشروع:
   ```bash
   cd C:\Users\yasser khuwayrah\Desktop\comixSite
   ```
3. شغّل خادم PHP:
   ```bash
   php -S localhost:8000
   ```
4. افتح المتصفح واذهب إلى:
   ```
   http://localhost:8000/login.html
   ```

### الحل 2: استخدام XAMPP

1. حمّل XAMPP من: https://www.apachefriends.org/
2. ثبّت XAMPP
3. انسخ مجلد المشروع إلى:
   ```
   C:\xampp\htdocs\comixSite
   ```
4. شغّل Apache من XAMPP Control Panel
5. افتح المتصفح واذهب إلى:
   ```
   http://localhost/comixSite/login.html
   ```

### الحل 3: استخدام WAMP

1. حمّل WAMP من: https://www.wampserver.com/
2. ثبّت WAMP
3. انسخ مجلد المشروع إلى:
   ```
   C:\wamp64\www\comixSite
   ```
4. شغّل WAMP
5. افتح المتصفح واذهب إلى:
   ```
   http://localhost/comixSite/login.html
   ```

## التحقق من أن PHP يعمل

افتح في المتصفح:
```
http://localhost:8000/test-api.php
```

إذا رأيت JSON response، فـ PHP يعمل بشكل صحيح.

## بيانات تسجيل الدخول

- **البريد الإلكتروني:** `admin@comixdev.com`
- **كلمة المرور:** `00100kayo`

## استكشاف الأخطاء

### الخطأ: "خطأ في الخادم"
1. تأكد من أن PHP يعمل (استخدم test-api.php)
2. افتح Developer Tools (F12) → Console
3. تحقق من Network tab لرؤية استجابة API
4. تأكد من أن ملف `data/members.json` موجود ويمكن قراءته

### الخطأ: "حدث خطأ في الاتصال"
- تأكد من أنك تستخدم `http://localhost` وليس `file://`
- تأكد من أن خادم PHP يعمل
- تحقق من Console للأخطاء

## ملاحظات مهمة

- **لا تفتح الملفات مباشرة من File Explorer** (file://)
- **يجب استخدام خادم محلي** (localhost)
- **تأكد من أن PHP مثبت** على جهازك

