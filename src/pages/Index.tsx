import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Package {
  id: number;
  name: string;
  price: number;
  coins: number;
  popular?: boolean;
}

const packages: Package[] = [
  { id: 1, name: 'Базовый пакет', price: 470, coins: 600 },
  { id: 2, name: 'Стандартный пакет', price: 920, coins: 1000 },
  { id: 3, name: 'Средний пакет', price: 1820, coins: 2000 },
  { id: 4, name: 'Хороший пакет', price: 2720, coins: 3000, popular: true },
  { id: 5, name: 'Отличный пакет', price: 4550, coins: 4000 },
  { id: 6, name: 'Лучший пакет', price: 9100, coins: 5700 },
  { id: 7, name: 'Максимальный пакет', price: 13600, coins: 7500 },
  { id: 8, name: 'Максимальный пакет', price: 18150, coins: 9500 },
];

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userBalance] = useState(1250);
  const [purchaseHistory] = useState([
    { id: 1, package: 'Стандартный пакет', coins: 1000, date: '2025-12-10', price: 920 },
    { id: 2, package: 'Базовый пакет', coins: 600, date: '2025-12-05', price: 470 },
  ]);
  const { toast } = useToast();

  const handlePurchase = (pkg: Package) => {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://yoomoney.ru/quickpay/confirm.xml';
    form.target = '_blank';

    const fields = {
      receiver: '4100118695716674',
      'quickpay-form': 'shop',
      targets: `Покупка ${pkg.name} - ${pkg.coins} монет`,
      'paymentType': 'SB',
      sum: pkg.price.toString(),
      'successURL': window.location.href,
    };

    Object.entries(fields).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);

    toast({
      title: 'Переход к оплате',
      description: `Открываем страницу оплаты для ${pkg.name}`,
    });
  };

  const renderNavigation = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 gradient-primary flex items-center justify-center rounded-0">
              <Icon name="Coins" className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Saya Coin,s </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {['home', 'shop', 'about', 'faq', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`font-medium transition-colors hover:text-primary ${
                  activeSection === section ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {section === 'home' && 'Главная'}
                {section === 'shop' && 'Магазин'}
                {section === 'about' && 'О сервисе'}
                {section === 'faq' && 'FAQ'}
                {section === 'contact' && 'Контакты'}
              </button>
            ))}
          </div>

          <Button onClick={() => setIsProfileOpen(true)} className="gradient-primary hover:opacity-90">
            <Icon name="User" size={18} className="mr-2" />
            Профиль
          </Button>
        </div>
      </div>
    </nav>
  );

  const renderHero = () => (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center animate-fade-in">
          <Badge className="mb-6 px-4 py-2 text-sm gradient-card">
            🎮 Игровая валюта нового поколения
          </Badge>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight">
            Покупай монеты
            <br />
            Играй больше
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Лучшие цены на игровую валюту. Мгновенное пополнение баланса. Безопасные платежи через ЮMoney.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="gradient-primary hover:opacity-90 text-lg px-8 py-6"
              onClick={() => setActiveSection('shop')}
            >
              <Icon name="ShoppingCart" size={20} className="mr-2" />
              Перейти в магазин
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 border-primary/30 hover:bg-primary/10"
              onClick={() => setIsProfileOpen(true)}
            >
              <Icon name="User" size={20} className="mr-2" />
              Мой профиль
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: 'Zap', title: 'Мгновенно', desc: 'Монеты на счету через секунды' },
              { icon: 'Shield', title: 'Безопасно', desc: 'Защищённые платежи' },
              { icon: 'TrendingUp', title: 'Выгодно', desc: 'Лучшие курсы обмена' },
            ].map((feature, idx) => (
              <Card key={idx} className="gradient-card border-primary/20 animate-scale-in" style={{ animationDelay: `${idx * 100}ms` }}>
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 rounded-full gradient-primary mx-auto mb-4 flex items-center justify-center">
                    <Icon name={feature.icon as any} className="text-white" size={24} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  const renderShop = () => (
    <section className="min-h-screen py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 gradient-card">💎 Магазин</Badge>
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Выберите пакет
          </h2>
          <p className="text-xl text-muted-foreground">Чем больше покупаешь — тем выгоднее!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {packages.map((pkg, idx) => (
            <Card 
              key={pkg.id} 
              className={`relative overflow-hidden transition-all hover:scale-105 hover:-translate-y-2 animate-fade-in ${
                pkg.popular 
                  ? 'gradient-card border-primary glow-purple' 
                  : 'bg-card/50 backdrop-blur-sm border-border/50'
              }`}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {pkg.popular && (
                <Badge className="absolute top-4 right-4 gradient-secondary">
                  ⭐ Популярный
                </Badge>
              )}
              
              <CardHeader>
                <div className="w-16 h-16 rounded-full gradient-primary mx-auto mb-4 flex items-center justify-center">
                  <Icon name="Coins" className="text-white" size={32} />
                </div>
                <CardTitle className="text-2xl text-center">{pkg.name}</CardTitle>
                <CardDescription className="text-center text-base">
                  Получи {pkg.coins.toLocaleString()} монет
                </CardDescription>
              </CardHeader>

              <CardContent className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  {pkg.price} ₽
                </div>
                <div className="text-sm text-muted-foreground">
                  ~{(pkg.price / pkg.coins).toFixed(2)} ₽ за монету
                </div>
              </CardContent>

              <CardFooter>
                <Button 
                  className="w-full gradient-primary hover:opacity-90" 
                  size="lg"
                  onClick={() => handlePurchase(pkg)}
                >
                  <Icon name="ShoppingCart" size={18} className="mr-2" />
                  Купить сейчас
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );

  const renderAbout = () => (
    <section className="min-h-screen py-24 relative">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 gradient-card">ℹ️ О сервисе</Badge>
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Почему мы?
          </h2>
        </div>

        <div className="grid gap-8">
          {[
            {
              icon: 'Rocket',
              title: 'Быстрое пополнение',
              desc: 'Монеты зачисляются на ваш баланс мгновенно после оплаты. Никаких задержек и ожидания.',
            },
            {
              icon: 'Lock',
              title: 'Безопасность платежей',
              desc: 'Используем проверенную систему ЮMoney для максимальной защиты ваших средств.',
            },
            {
              icon: 'BadgePercent',
              title: 'Выгодные курсы',
              desc: 'Чем больше пакет — тем выгоднее цена за одну монету. Экономьте на крупных покупках!',
            },
            {
              icon: 'Headphones',
              title: 'Поддержка 24/7',
              desc: 'Наша команда всегда готова помочь решить любые вопросы по покупке или использованию монет.',
            },
          ].map((item, idx) => (
            <Card key={idx} className="gradient-card border-primary/20 animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
              <CardContent className="pt-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full gradient-secondary flex-shrink-0 flex items-center justify-center">
                  <Icon name={item.icon as any} className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );

  const renderFAQ = () => (
    <section className="min-h-screen py-24 relative">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 gradient-card">❓ FAQ</Badge>
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            Частые вопросы
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {[
            {
              q: 'Монеты',
              a: 'После оплаты скиньте скриншот в мой Telegram @SayaGAMeOFFICIAL, потом пришлите свой ID в игре Saya и я к вам зайду.',
            },
            {
              q: 'Какие способы оплаты вы принимаете?',
              a: 'Мы принимаем оплату через ЮMoney: банковские карты, электронные кошельки и другие способы, доступные в системе.',
            },
            {
              q: 'Можно ли вернуть деньги?',
              a: 'Возврат средств возможен только в случае технического сбоя и незачисления монет на баланс. Обратитесь в службу поддержки.',
            },
            {
              q: 'Где я могу использовать купленные монеты?',
              a: 'Монеты можно использовать для покупок внутри игры: предметы, улучшения, доступ к премиум-контенту и многое другое.',
            },
            {
              q: 'Есть ли ограничения на покупку?',
              a: 'Нет ограничений по количеству покупок. Вы можете приобретать любое количество пакетов в любое время.',
            },
          ].map((item, idx) => (
            <AccordionItem 
              key={idx} 
              value={`item-${idx}`} 
              className="gradient-card border-primary/20 px-6 rounded-lg"
            >
              <AccordionTrigger className="text-left hover:text-primary">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );

  const renderContact = () => (
    <section className="min-h-screen py-24 relative">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 gradient-card">📧 Контакты</Badge>
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            Свяжитесь с нами
          </h2>
          <p className="text-xl text-muted-foreground">Мы всегда рады помочь!</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            { icon: 'Mail', title: 'Email', value: 'gogleplaydonat1@gmail.com', link: 'mailto:gogleplaydonat1@gmail.com' },
            { icon: 'MessageCircle', title: 'Telegram', value: '@SayaGAMeOFFICIAL', link: 'https://t.me/SayaGAMeOFFICIAL' },
            { icon: 'Phone', title: 'Телефон', value: '+7 [952] 455-60-37', link: 'tel:+79524556037' },
            { icon: 'Clock', title: 'Время работы', value: 'Пн-Пт: 10:00 - 00:00', link: '#' },
          ].map((contact, idx) => (
            <Card 
              key={idx} 
              className="gradient-card border-primary/20 hover:scale-105 transition-transform animate-fade-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 rounded-full gradient-primary mx-auto mb-4 flex items-center justify-center">
                  <Icon name={contact.icon as any} className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{contact.title}</h3>
                {contact.link !== '#' ? (
                  <a 
                    href={contact.link} 
                    className="text-primary hover:text-secondary transition-colors"
                  >
                    {contact.value}
                  </a>
                ) : (
                  <p className="text-muted-foreground">{contact.value}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );

  const renderProfile = () => (
    <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
      <DialogContent className="sm:max-w-2xl gradient-card border-primary/30">
        <DialogHeader>
          <DialogTitle className="text-3xl flex items-center gap-3">
            <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
              <Icon name="User" className="text-white" size={24} />
            </div>
            Личный кабинет
          </DialogTitle>
          <DialogDescription>
            Управляйте вашим балансом и просматривайте историю покупок
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <Card className="gradient-primary border-0">
            <CardContent className="pt-6 text-center">
              <Icon name="Coins" className="text-white mx-auto mb-3" size={48} />
              <div className="text-white/80 text-sm mb-2">Ваш баланс</div>
              <div className="text-5xl font-bold text-white mb-2">
                {userBalance.toLocaleString()}
              </div>
              <div className="text-white/60">монет</div>
            </CardContent>
          </Card>

          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Icon name="History" size={20} />
              История покупок
            </h3>
            <div className="space-y-3">
              {purchaseHistory.map((purchase) => (
                <Card key={purchase.id} className="bg-card/50 border-border/50">
                  <CardContent className="pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full gradient-secondary flex items-center justify-center">
                        <Icon name="ShoppingBag" className="text-white" size={20} />
                      </div>
                      <div>
                        <div className="font-medium">{purchase.package}</div>
                        <div className="text-sm text-muted-foreground">{purchase.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-primary">+{purchase.coins} монет</div>
                      <div className="text-sm text-muted-foreground">{purchase.price} ₽</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-background">
      {renderNavigation()}
      
      {activeSection === 'home' && renderHero()}
      {activeSection === 'shop' && renderShop()}
      {activeSection === 'about' && renderAbout()}
      {activeSection === 'faq' && renderFAQ()}
      {activeSection === 'contact' && renderContact()}
      
      {renderProfile()}

      <footer className="border-t border-border py-8 mt-24">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 CoinShop. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;