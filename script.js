function formatearMoneda(valor) {
  return "S/" + (Math.ceil(valor * 100) / 100).toFixed(2);
}

function calcular() {
  let haberMensualInput = document.getElementById("haberMensual").value.replace("S/", "").trim();
  let haberSeleccionado = document.getElementById("haberPredefinido").value;
  let porcentajeInput = document.getElementById("porcentaje").value.replace("%", "").trim();
  let diasMulta = parseInt(document.getElementById("diasMulta").value);

  let haberMensual = haberMensualInput ? parseFloat(haberMensualInput) : parseFloat(haberSeleccionado);

  if (!haberMensual || isNaN(haberMensual)) return;

  let haberDiario = haberMensual / 30;
  let porcentaje = parseFloat(porcentajeInput);
  if (isNaN(porcentaje) || porcentaje < 25 || porcentaje > 50) return;

  let valorDiaMulta = haberDiario * (porcentaje / 100);
  if (!diasMulta || diasMulta < 10 || diasMulta > 730) return;

  let montoFinal = valorDiaMulta * diasMulta;

  document.getElementById("haberDiario").textContent = formatearMoneda(haberDiario);
  document.getElementById("valorDiaMulta").textContent = formatearMoneda(valorDiaMulta);
  document.getElementById("cantidadDias").textContent = diasMulta;
  document.getElementById("montoFinal").textContent = formatearMoneda(montoFinal);

  // Guardamos valores para descuento y compartir
  window.resultado = {
    haberDiario,
    valorDiaMulta,
    diasMulta,
    montoFinal
  };
}

document.getElementById("haberMensual").addEventListener("input", calcular);
document.getElementById("haberPredefinido").addEventListener("change", function () {
  document.getElementById("haberMensual").value = "";
  calcular();
});
document.getElementById("porcentaje").addEventListener("input", calcular);
document.getElementById("diasMulta").addEventListener("input", calcular);

document.getElementById("copiar").addEventListener("click", () => {
  const r = window.resultado;
  if (!r) return;
  const texto = `Haber diario: ${formatearMoneda(r.haberDiario)}\nValor de cada día-multa: ${formatearMoneda(r.valorDiaMulta)}\nCantidad de días-multa: ${r.diasMulta}\nMonto final: ${formatearMoneda(r.montoFinal)}`;
  navigator.clipboard.writeText(texto);
});

document.getElementById("whatsapp").addEventListener("click", () => {
  const r = window.resultado;
  if (!r) return;
  const texto = `Víctor Siu te brinda el resultado:\nHaber diario: ${formatearMoneda(r.haberDiario)}\nValor de cada día-multa: ${formatearMoneda(r.valorDiaMulta)}\nCantidad de días-multa: ${r.diasMulta}\nMonto final: ${formatearMoneda(r.montoFinal)}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, "_blank");
});

document.getElementById("nuevo").addEventListener("click", () => {
  location.reload();
});

document.getElementById("descuentoSexto").addEventListener("click", () => aplicarDescuento(6, "1/6 por Terminación anticipada"));
document.getElementById("descuentoSeptimo").addEventListener("click", () => aplicarDescuento(7, "1/7 por Conclusión anticipada"));

function aplicarDescuento(divisor, tipo) {
  const r = window.resultado;
  if (!r) return;
  const montoDescontado = r.montoFinal / divisor;
  const resultadoFinal = r.montoFinal - montoDescontado;

  document.getElementById("tipoDescuento").textContent = tipo;
  document.getElementById("montoDescontado").textContent = formatearMoneda(montoDescontado);
  document.getElementById("resultadoDescuento").textContent = formatearMoneda(resultadoFinal);
  document.getElementById("botonesDescuento").style.display = "flex";

  window.resultadoDescuento = {
    tipo,
    montoDescontado,
    resultadoFinal,
    montoOriginal: r.montoFinal
  };
}

document.getElementById("copiarDescuento").addEventListener("click", () => {
  const r = window.resultadoDescuento;
  if (!r) return;
  const texto = `Monto original: ${formatearMoneda(r.montoOriginal)}\nTipo de descuento: ${r.tipo}\nMonto descontado: ${formatearMoneda(r.montoDescontado)}\nMonto total con descuento: ${formatearMoneda(r.resultadoFinal)}`;
  navigator.clipboard.writeText(texto);
});

document.getElementById("whatsappDescuento").addEventListener("click", () => {
  const r = window.resultadoDescuento;
  if (!r) return;
  const texto = `Víctor Siu te brinda el resultado:\nMonto original: ${formatearMoneda(r.montoOriginal)}\nTipo de descuento: ${r.tipo}\nMonto descontado: ${formatearMoneda(r.montoDescontado)}\nMonto total con descuento: ${formatearMoneda(r.resultadoFinal)}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, "_blank");
});

document.getElementById("nuevoDescuento").addEventListener("click", () => {
  location.reload();
});

document.getElementById("themeToggle").addEventListener("change", () => {
  document.body.classList.toggle("dark");
});
