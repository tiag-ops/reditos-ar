// Script anti-flash: aplica el tema ANTES del primer paint. Se inyecta en <head>.
// Default: light-mode. Solo entra en dark si el usuario lo persistió previamente
// (localStorage 'tema' === 'dark'); la preferencia del sistema ya no se aplica.
export const themeScript = `(function(){try{if(localStorage.getItem('tema')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}})();`;
