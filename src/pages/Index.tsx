import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    city: '',
    phone: '',
    telegram: '',
    consent: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'Введите имя';
    if (!formData.lastName.trim()) newErrors.lastName = 'Введите фамилию';
    if (!formData.city.trim()) newErrors.city = 'Введите город';
    if (!formData.phone.trim()) newErrors.phone = 'Введите номер телефона';
    if (!formData.telegram.trim()) newErrors.telegram = 'Введите ник в Telegram';
    else if (!formData.telegram.startsWith('@') || formData.telegram.length < 5 || formData.telegram.length > 32) {
      newErrors.telegram = 'Ник должен начинаться с @ и содержать от 5 до 32 символов';
    }
    if (!formData.consent) newErrors.consent = 'Необходимо согласие на обработку данных';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Спасибо!",
        description: "Мы получили вашу анкету. В ближайшее время свяжемся и вышлем ТЗ проекта."
      });
      setIsDialogOpen(false);
      setFormData({
        firstName: '',
        lastName: '',
        city: '',
        phone: '',
        telegram: '',
        consent: false
      });
    }, 1500);
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 1) return '+7 ';
    if (numbers.length <= 4) return `+7 (${numbers.slice(1)}`;
    if (numbers.length <= 7) return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4)}`;
    if (numbers.length <= 9) return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7)}`;
    return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7, 9)}-${numbers.slice(9, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData(prev => ({ ...prev, phone: formatted }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-light tracking-wider text-foreground">
              ALEXSKIN
            </div>
            <nav className="hidden md:flex items-center gap-8 text-sm text-secondary">
              <a href="#" className="hover:text-foreground transition-colors">О БРЕНДЕ</a>
              <a href="#" className="hover:text-foreground transition-colors">КАТАЛОГ</a>
              <a href="#" className="hover:text-foreground transition-colors">СОТРУДНИЧЕСТВО</a>
              <Icon name="Search" size={20} className="cursor-pointer hover:text-foreground transition-colors" />
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-light text-foreground tracking-wide mb-8 max-w-4xl mx-auto leading-relaxed">
            ЛЮБИТЬ. ЦЕНИТЬ. БЕРЕЧЬ СЕБЯ.
          </h1>
        </div>

        {/* Main Content */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-20 lg:items-start">
          {/* Left Column - Content */}
          <div className="space-y-12 lg:pr-8">
            {/* About Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-normal text-foreground tracking-wide flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                АГЕНТЫ ALEXSKIN
              </h2>
              <div className="space-y-4 text-secondary leading-relaxed text-sm">
                <p>
                  Приглашаем девушек первыми пробовать новинки ALEXSKIN, снимать обзоры и делиться честными отзывами. 
                  Публикуйте фото и видео в социальных сетях — а мы пришлём подробное ТЗ после ознакомления с вашей анкетой.
                </p>
                <p>
                  За участие вы получите бокс с нашей косметикой.
                </p>
              </div>
              
              <Button 
                onClick={() => setIsDialogOpen(true)}
                className="border border-primary bg-transparent hover:bg-primary hover:text-white text-primary transition-all duration-300 rounded-none px-8 py-3 text-xs tracking-wider font-normal"
              >
                СТАТЬ АГЕНТОМ
              </Button>
            </div>

            {/* What You'll Do */}
            <div className="space-y-6">
              <h3 className="text-lg font-normal text-foreground tracking-wide">ЧТО БУДЕТЕ ДЕЛАТЬ:</h3>
              <ul className="space-y-3 text-secondary text-sm leading-relaxed">
                <li>• Тестировать новинки ALEXSKIN</li>
                <li>• Снимать короткие обзоры/распаковки и делиться искренним мнением</li>
                <li>• Публиковать фото и видео в соцсетях и отмечать бренд</li>
                <li>• Присылать нам ссылки на материалы</li>
              </ul>
            </div>

            {/* What You'll Get */}
            <div className="space-y-6">
              <h3 className="text-lg font-normal text-foreground tracking-wide">ЧТО ВЫ ПОЛУЧИТЕ:</h3>
              <ul className="space-y-3 text-secondary text-sm leading-relaxed">
                <li>• Бокс с косметикой ALEXSKIN для съёмок и тестирования</li>
                <li>• Возможность попасть в наши подборки и репосты</li>
                <li>• Ранний доступ к анонсам и закрытым активностям</li>
              </ul>
            </div>

            {/* How to Join */}
            <div className="space-y-6">
              <h3 className="text-lg font-normal text-foreground tracking-wide">КАК ПОПАСТЬ В ПРОЕКТ:</h3>
              <ol className="space-y-3 text-secondary text-sm leading-relaxed">
                <li>1. Нажмите «Стать агентом» и заполните анкету</li>
                <li>2. Мы рассмотрим заявку и свяжемся с вами</li>
                <li>3. Отправим подробное ТЗ и бокс с косметикой</li>
              </ol>
            </div>

            {/* Terms */}
            <div className="space-y-6">
              <h3 className="text-lg font-normal text-foreground tracking-wide">УСЛОВИЯ УЧАСТИЯ:</h3>
              <div className="space-y-4 text-secondary text-sm leading-relaxed">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-foreground">Возраст:</span> 18+
                  </div>
                  <div>
                    <span className="text-foreground">География:</span> РФ
                  </div>
                </div>
                <div>
                  <span className="text-foreground">Соцсети:</span> открытый профиль (VK/TikTok/YouTube/Telegram и др)
                </div>
                <div>
                  <span className="text-foreground">Контент:</span> минимум 3 видеообзора и 1 пост/сторис с отметкой бренда в течение 14 дней после получения бокса
                </div>
                <div>
                  <span className="text-foreground">Отметки:</span> @alexskin и #ALEXSKIN
                </div>
                <div>
                  <span className="text-foreground">Права:</span> разрешение на репост/использование фрагментов
                </div>
                <div>
                  <span className="text-foreground">Персональные данные:</span> обрабатываются по Политике конфиденциальности
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="mt-16 lg:mt-0 lg:sticky lg:top-24">
            <div className="relative">
              <img
                src="/img/3585a887-9b20-4e14-8306-98b45aae98d0.jpg"
                alt="Александра Варяникова - ALEXSKIN"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white border-border">
          <DialogHeader>
            <DialogTitle className="text-xl font-light text-foreground tracking-wide text-center">
              СТАТЬ АГЕНТОМ ALEXSKIN
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-xs text-secondary tracking-wide">ИМЯ *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  className={`border-0 border-b border-border rounded-none bg-transparent focus:border-primary transition-colors ${errors.firstName ? 'border-red-500' : ''}`}
                />
                {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-xs text-secondary tracking-wide">ФАМИЛИЯ *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  className={`border-0 border-b border-border rounded-none bg-transparent focus:border-primary transition-colors ${errors.lastName ? 'border-red-500' : ''}`}
                />
                {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city" className="text-xs text-secondary tracking-wide">ГОРОД *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                className={`border-0 border-b border-border rounded-none bg-transparent focus:border-primary transition-colors ${errors.city ? 'border-red-500' : ''}`}
              />
              {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-xs text-secondary tracking-wide">НОМЕР ТЕЛЕФОНА *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={handlePhoneChange}
                placeholder="+7 (999) 999-99-99"
                className={`border-0 border-b border-border rounded-none bg-transparent focus:border-primary transition-colors ${errors.phone ? 'border-red-500' : ''}`}
              />
              {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="telegram" className="text-xs text-secondary tracking-wide">НИК В TELEGRAM *</Label>
              <Input
                id="telegram"
                value={formData.telegram}
                onChange={(e) => setFormData(prev => ({ ...prev, telegram: e.target.value }))}
                placeholder="@username"
                className={`border-0 border-b border-border rounded-none bg-transparent focus:border-primary transition-colors ${errors.telegram ? 'border-red-500' : ''}`}
              />
              {errors.telegram && <p className="text-red-500 text-xs">{errors.telegram}</p>}
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="consent"
                checked={formData.consent}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, consent: !!checked }))}
                className={`mt-1 ${errors.consent ? 'border-red-500' : ''}`}
              />
              <label htmlFor="consent" className="text-xs text-secondary leading-relaxed">
                Я согласен(а) на обработку персональных данных согласно Политике конфиденциальности
              </label>
            </div>
            {errors.consent && <p className="text-red-500 text-xs">{errors.consent}</p>}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full border border-primary bg-transparent hover:bg-primary hover:text-white text-primary transition-all duration-300 rounded-none py-3 text-xs tracking-wider font-normal"
            >
              {isLoading ? (
                <>
                  <Icon name="Loader2" className="mr-2 animate-spin" size={16} />
                  ОТПРАВЛЯЕМ...
                </>
              ) : (
                'ОТПРАВИТЬ АНКЕТУ'
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;