const contactPage = () => {
  //contacto
  return (
    <div className="max-w-3xl mx-auto my-20 p-10 bg-white text-black rounded-3xl shadow-xl border border-neutral-200">
      <h1 className="text-4xl font-bold text-center mb-4">📩 Contactanos</h1>
      <p className="text-center text-lg text-neutral-600 mb-8">
        Nos encantaría saber de vos. Si tenés dudas o necesitás soporte, escribinos...
      </p>
      <div className="text-center space-y-4 text-lg font-medium">
        <p>📧 Email: <span className="font-semibold">support@store.com</span></p>
        <p>📞 Teléfono: <span className="font-semibold">+54 11 2503 3874</span></p>
      </div>
    </div>
  );
};

export default contactPage;