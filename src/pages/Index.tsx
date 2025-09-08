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
    
    // Симуляция отправки
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
    <div className="min-h-screen bg-gradient-to-br from-beauty-cream via-white to-beauty-light">
      <div className="container mx-auto px-4 py-8">
        {/* Desktop и Tablet Layout */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start lg:min-h-screen">
          {/* Левая колонка - Контент */}
          <div className="space-y-8 lg:py-16">
            {/* Заголовок */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Агенты <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">ALEXSKIN</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
                Приглашаем девушек первыми пробовать новинки ALEXSKIN, снимать обзоры и делиться честными отзывами. 
                Публикуйте фото и видео в социальных сетях — а мы пришлём подробное ТЗ после ознакомления с вашей анкетой. 
                За участие вы получите бокс с нашей косметикой.
              </p>
            </div>

            {/* Что будете делать */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">Что будете делать:</h2>
              <ul className="space-y-3">
                {[
                  'Тестировать новинки ALEXSKIN',
                  'Снимать короткие обзоры/распаковки и делиться искренним мнением',
                  'Публиковать фото и видео в соцсетях и отмечать бренд',
                  'Присылать нам ссылки на материалы'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Icon name="Sparkles" className="text-primary mt-1 flex-shrink-0" size={20} />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Что получите */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">Что вы получите:</h2>
              <ul className="space-y-3">
                {[
                  'Бокс с косметикой ALEXSKIN для съёмок и тестирования',
                  'Возможность попасть в наши подборки и репосты',
                  'Ранний доступ к анонсам и закрытым активностям'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Icon name="Gift" className="text-secondary mt-1 flex-shrink-0" size={20} />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Как попасть */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">Как попасть в проект:</h2>
              <ol className="space-y-3">
                {[
                  'Нажмите «Стать агентом» и заполните анкету',
                  'Мы рассмотрим заявку и свяжемся с вами',
                  'Отправим подробное ТЗ и бокс с косметикой'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="bg-gradient-to-r from-primary to-secondary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Условия участия */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">Условия участия:</h2>
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 space-y-3">
                {[
                  { label: 'Возраст', value: '18+' },
                  { label: 'География', value: 'РФ' },
                  { label: 'Соцсети', value: 'открытый профиль (VK/TikTok/YouTube/Telegram и др)' },
                  { label: 'Контент', value: 'минимум 3 видеообзора и 1 пост/сторис с отметкой бренда в течение 14 дней после получения бокса' },
                  { label: 'Отметки', value: '@alexskin и #ALEXSKIN' },
                  { label: 'Права', value: 'разрешение на репост/использование фрагментов' },
                  { label: 'Персональные данные', value: 'обрабатываются по Политике конфиденциальности' }
                ].map((item, index) => (
                  <div key={index} className="flex flex-col sm:flex-row gap-2">
                    <span className="font-medium text-gray-900 min-w-[140px]">{item.label}:</span>
                    <span className="text-gray-700">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Кнопка */}
            <div className="pt-4">
              <Button 
                onClick={() => setIsDialogOpen(true)}
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Icon name="Sparkles" className="mr-2" size={20} />
                Стать агентом
              </Button>
            </div>
          </div>

          {/* Правая колонка - Изображение (Sticky на Desktop) */}
          <div className="mt-12 lg:mt-0 lg:sticky lg:top-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-2xl transform rotate-3"></div>
              <img
                src="/img/3585a887-9b20-4e14-8306-98b45aae98d0.jpg"
                alt="Александра Варяникова - ALEXSKIN"
                className="relative rounded-3xl shadow-2xl w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Попап-форма */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Стать агентом ALEXSKIN
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Имя *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  className={errors.firstName ? 'border-red-500' : ''}
                />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Фамилия *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  className={errors.lastName ? 'border-red-500' : ''}
                />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">Город *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                className={errors.city ? 'border-red-500' : ''}
              />
              {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Номер телефона *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={handlePhoneChange}
                placeholder="+7 (999) 999-99-99"
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="telegram">Ник в Telegram *</Label>
              <Input
                id="telegram"
                value={formData.telegram}
                onChange={(e) => setFormData(prev => ({ ...prev, telegram: e.target.value }))}
                placeholder="@username"
                className={errors.telegram ? 'border-red-500' : ''}
              />
              {errors.telegram && <p className="text-red-500 text-sm">{errors.telegram}</p>}
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="consent"
                checked={formData.consent}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, consent: !!checked }))}
                className={errors.consent ? 'border-red-500' : ''}
              />
              <label htmlFor="consent" className="text-sm text-gray-600 leading-relaxed">
                Я согласен(а) на обработку персональных данных согласно Политике конфиденциальности
              </label>
            </div>
            {errors.consent && <p className="text-red-500 text-sm">{errors.consent}</p>}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold"
            >
              {isLoading ? (
                <>
                  <Icon name="Loader2" className="mr-2 animate-spin" size={16} />
                  Отправляем...
                </>
              ) : (
                'Отправить анкету'
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;