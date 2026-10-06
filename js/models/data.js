/* MODEL — all content & state. No DOM access here. Source: Sameer_Biswas_CV.pdf */
window.Biogi = window.Biogi || {};
Biogi.Model = {
  profile: {
    name: "Sameer Biswas", first: "Sameer", last: "Biswas", role: "Full Stack Developer", tag: "WordPress | PHP | Laravel",
    intro: "I build fast, responsive and SEO-friendly websites with WordPress, and structured database-driven web apps with PHP and Laravel.",
    worked: "Delivered 20+ WordPress websites", years: "3+",
    bio: "PHP & WordPress developer with 3+ years of experience developing, customizing and maintaining web applications and websites. I work with PHP, MySQL, WordPress, WooCommerce, Elementor, REST API integration, website optimisation and technical SEO. I also build structured, database-driven applications in Laravel using MVC architecture, routing, controllers, models, migrations, validation and CRUD operations.",
    info: [["Name","Sameer Biswas"],["Location","Uttarakhand, India"],["Phone","+91 7455973807"],["Email","biswassameer291@gmail.com"],["Experience","3+ years"],["Freelance","Available"],["Role","WordPress & PHP Developer"],["Education","Diploma in Computer Science Engineering"]],
    brands: ["Predicta Digital","Next Web Guru","WordPress","Laravel"]
  },
  nav: [["home","house","Home"],["about","person","About"],["resume","file-earmark-text","Resume"],["services","gear","Services"],["portfolio","grid","Portfolio"],["pricing","tag","Packages"],["blog","journal-text","Blog"],["contact","envelope","Contact"]],
  education: [
    {t:"Diploma in Computer Science Engineering",s:"Government Polytechnic, Nainital / 2020 – 2022",d:"Three-year diploma programme based in Nainital, Uttarakhand."},
    {t:"Graphic Design & UI/UX",s:"Simplilearn Upskill / Certification",d:"Visual design and user-interface fundamentals for creating banners, graphics and layouts."},
    {t:"CSS, Bootstrap, JavaScript, PHP",s:"Udemy / Certification",d:"Hands-on courses covering the frontend and backend foundations used in daily project work."}],
  experience: [
    {t:"Remote Web Developer",s:"Predicta Digital (Remote) / April 2026 – Present",d:"Maintain 5+ WordPress websites for Australian and international clients with 99%+ uptime, and reached 90+ Google PageSpeed scores using WP Rocket, caching and image optimisation."},
    {t:"WordPress & PHP Developer",s:"Next Web Guru Techno Service Pvt. Ltd. / 2023 – 2026",d:"Developed 20+ responsive WordPress sites, worked on core modules of a Laravel-based MLM system, and improved speed and SEO through code optimisation, caching and database tuning."}],
  coding: [["WordPress",90],["PHP",85],["MySQL",80],["Laravel",70],["JavaScript",70],["HTML/CSS",90]],
  design: [["Elementor",90,"#ff6b9d"],["WooCommerce",85,"#6c3df4"],["Figma",70,"#ff61f6"],["Canva",80,"#31a8ff"],["WP Rocket / SEO",85,"#ffb300"]],
  awards: [
    {n:"90+ Google PageSpeed scores",y:"2026",s:"Performance"},
    {n:"99%+ uptime on 5+ client sites",y:"2026",s:"Reliability"},
    {n:"20+ WordPress websites delivered",y:"2023 – 2026",s:"Delivery"},
    {n:"Laravel MLM system modules",y:"2023 – 2026",s:"Backend"}],
  services: [
    {i:"wordpress",c:"#ff6b9d",t:"WordPress Development",d:"Custom design, plugins, Elementor builds and WooCommerce integration for business and eCommerce sites."},
    {i:"code-slash",c:"#00cc97",t:"Laravel & PHP Apps",d:"MVC apps with authentication, authorisation, form validation, CRUD and MySQL migrations."},
    {i:"speedometer2",c:"#6c3df4",t:"Speed & SEO",d:"Caching, image optimisation, database tuning and on-page technical SEO."},
    {i:"window-stack",c:"#ff8a5b",t:"Responsive Frontend",d:"HTML, CSS, Bootstrap, JavaScript and jQuery layouts that work on every device."}],
  filters: [["all","All"],["wordpress","WordPress"],["woocommerce","WooCommerce"],["laravel","Laravel"]],
  portfolio: [
    {t:"Predicta Analytics",cat:"wordpress",g:["#6c3df4","#31a8ff"]},
    {t:"WooCommerce Store",cat:"woocommerce",g:["#ff8a5b","#ffb300"]},
    {t:"MLM Management System",cat:"laravel",g:["#2b2f3a","#ff6b9d"]},
    {t:"Corporate Websites",cat:"wordpress",g:["#00cc97","#31a8ff"]}],
  pricing: [
    {n:"WordPress Website",p:"Custom",c:"#ff6b9d",i:"wordpress",f:["Custom Elementor design","Responsive layout","On-page SEO","Speed optimisation","Plugin setup"]},
    {n:"WooCommerce Store",p:"Custom",c:"#6c3df4",i:"cart-fill",f:["Product & cart setup","Payment gateway integration","ACF custom fields","Caching & database tuning","Debugging & support"]},
    {n:"Laravel Application",p:"Custom",c:"#ff8a5b",i:"code-square",f:["MVC architecture","Authentication & authorisation","CRUD & form validation","MySQL migrations","REST API integration"]}],
  testimonials: [
    {n:"Performance first",r:"WP Rocket · caching · image optimisation",q:"Client sites reach 90+ Google PageSpeed scores through caching, image optimisation and database tuning."},
    {n:"Structured backend",r:"Laravel · PHP · MySQL",q:"Database-driven apps are built with routing, controllers, models, migrations and validation, as in the Laravel-based MLM system."},
    {n:"Reliable delivery",r:"Australian & international clients",q:"5+ client WordPress sites run at 99%+ uptime, and 20+ responsive sites have shipped for business, corporate and eCommerce clients."}],
  blogs: [
    {d:"05",m:"Oct",y:"2026",cat:"WordPress",t:"How to Reach 90+ PageSpeed Scores on WordPress",x:"Sample post: caching, image optimisation and WP Rocket settings that improve real-world speed.",g:["#ffb300","#ff6b9d"]},
    {d:"01",m:"Oct",y:"2026",cat:"Laravel",t:"Laravel MVC Basics: Routes, Controllers and Models",x:"Sample post: how a request flows through a Laravel app, with a simple CRUD example.",g:["#31a8ff","#6c3df4"]},
    {d:"25",m:"Sep",y:"2026",cat:"WooCommerce",t:"WooCommerce Payment Gateway Integration Checklist",x:"Sample post: steps to test and secure checkout before launching an online store.",g:["#ff8a5b","#ff6b9d"]}],
  contact: {email:"biswassameer291@gmail.com",phone:"+91 7455973807"},
  state: { filter: "all", slide: 0 }
};
