// ************************************************************************
// ** SECCIÓN: Lógica de Seguimiento de Pedidos (Consulta Google Sheet) **
// ************************************************************************
function rastrearPedido() {
    const codigoSeguimiento = document.getElementById('trackingCode').value.trim().toUpperCase();
    const resultadoTracking = document.querySelector('.tracking-result');

    if (!codigoSeguimiento) {
        resultadoTracking.innerHTML = "<p class='error-msg'>Por favor, ingrese su código de seguimiento.</p>";
        return; // Detiene la función si no hay código
    }

    resultadoTracking.innerHTML = "<p class='info-msg'>Buscando información del pedido...</p>";

    const sheetId = '2PACX-1vS5NFEKuLZmf0bJPFURFuEN11X4MDKvSVy-OFADhXgfkkT8c4dYswB0HEyIz_UIzezYnZX4ybplQOUL'; // Reemplaza con el ID de tu hoja
    const sheetName = 'Guerreros'; // Reemplaza con el nombre de tu hoja (si es diferente)
    const url = `https://docs.google.com/spreadsheets/d/e/${sheetId}/pub?gid=0&single=true&output=csv`;

    fetch(url)
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').map(row => row.split(','));
            let encontrado = false;

            // Asume que la primera fila son los encabezados de las columnas
            const encabezados = rows[0].map(header => header.trim().toUpperCase());

            const columnaPedido = encabezados.indexOf('PEDIDO'); // Reemplaza 'PEDIDO' con el nombre de tu columna de código de seguimiento
            const columnaEstado = encabezados.indexOf('ESTADO'); // Reemplaza 'ESTADO' con el nombre de tu columna de estado
            const columnaHorario = encabezados.indexOf('HORARIO'); // Reemplaza 'HORARIO' con el nombre de tu columna de horario (opcional)

            if (columnaPedido === -1 || columnaEstado === -1) {
                resultadoTracking.innerHTML = "<p class='error-msg'>Error: No se encontraron las columnas 'PEDIDO' o 'ESTADO' en la hoja.</p>";
                return;
            }

            for (let i = 1; i < rows.length; i++) { // Empezamos desde la segunda fila (después de los encabezados)
                const pedidoEnHoja = rows[i][columnaPedido]?.trim().toUpperCase();
                if (pedidoEnHoja === codigoSeguimiento) {
                    encontrado = true;
                    const estado = rows[i][columnaEstado]?.trim();
                    const horario = columnaHorario !== -1 ? `Horario estimado: ${rows[i][columnaHorario]?.trim()}` : '';
                    resultadoTracking.innerHTML = `<p class='success-msg'><strong>Estado:</strong> ${estado},</p>${columnaHorario !== -1 && rows[i][columnaHorario]?.trim() ? `<p class='info-msg'><strong>Horario estimado:</strong> ${rows[i][columnaHorario]?.trim()}</p>` : ''}`;
                    break;
                }
            }

            if (!encontrado) {
                resultadoTracking.innerHTML = "<p class='error-msg'>Pedido no encontrado. Verifica el código e inténtalo de nuevo.</p>";
            }
        })
        .catch(error => {
            console.error('Error al leer la Google Sheet:', error);
            resultadoTracking.innerHTML = "<p class='error-msg'>Error al conectar con la información de seguimiento.</p>";
        });
}

// ************************************************************************
// ** SECCIÓN: Lógica del Formulario de Contacto (Simulada)              **
// ************************************************************************
document.getElementById('contactForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    // Aquí iría la lógica para enviar los datos del formulario
    // Por ejemplo, usando fetch() a un backend o a un servicio como Formspree
    alert('Mensaje enviado (simulación). ¡Gracias por contactarnos!');
    this.reset(); // Limpia el formulario
});

// ************************************************************************
// ** SECCIÓN: Lógica para Volver Arriba                                 **
// ************************************************************************
function scrollToTop(event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// ************************************************************************
// ** SECCIÓN: Lógica para el Año Actual del Footer                      **
// ************************************************************************
document.getElementById('currentYear').textContent = new Date().getFullYear();