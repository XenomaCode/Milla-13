const Footer = () => {
  return (
    <footer className="bg-none text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p>© {new Date().getFullYear()} Milla 13 - Todos los derechos reservados</p>
        <p className="mt-2">Dirección: Calle Principal #123 | Teléfono: 123-456-7890</p>
      </div>
    </footer>
  );
};
export default Footer;