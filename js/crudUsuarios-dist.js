function createUser(e, a) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(e, a)
    .then(e => {
      var a = e.user;
      console.info(`Usuario creado correctamente ${a}`);
    })
    .catch(e => {
      var a = e.code,
        t = e.message;
      return alert(`Error ${a} - ${t}`);
    });
}
$(document).ready(function () {
  var e;
  let a = !1;
  const t = firebase.database();
  coleccionUsuarios = t.ref().child('usuarios');
  var o = [],
    i = $('#tablaUsuarios').DataTable({
      language: {
        decimal: '',
        emptyTable: 'No hay información',
        info: 'Mostrando _START_ a _END_ de _TOTAL_ Entradas',
        infoEmpty: 'Mostrando 0 to 0 of 0 Entradas',
        infoFiltered: '(Filtrado de _MAX_ total entradas)',
        infoPostFix: '',
        thousands: ',',
        lengthMenu: 'Mostrar _MENU_ Entradas',
        loadingRecords: 'Cargando...',
        processing: 'Procesando...',
        search: 'Buscar:',
        zeroRecords: 'Sin resultados encontrados',
        paginate: {
          first: 'Primero',
          last: 'Ultimo',
          next: 'Siguiente',
          previous: 'Anterior',
        },
      },
      data: o,
      columnDefs: [
        { targets: [0, 5], visible: !1 },
        {
          targets: -1,
          defaultContent:
            '<div class=\'wrapper text-center\'><div class=\'btn-group\'><button class=\'btnEditar btn btn-primary\' data-toggle=\'tooltip\' title=\'Editar\'><svg class="bi bi-pencil-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>',
        },
      ],
      dom: 'Blfrtip',
      pageLength: 5,
      lengthMenu: [
        [5, 10, 20, -1],
        [5, 10, 20, 'Todos'],
      ],
      buttons: {
        dom: { button: { className: 'btn' } },
        buttons: [
          {
            extend: 'excelHtml5',
            title:
              'Reporte de Usuarios de Aplicación de Alertas - Municipalidad de Chicama',
            text: '<i class="fas fa-file-excel icono-excel"></i>',
            titleAttr: 'Exportar a Excel',
            className: 'btn btn-success excelButton',
            messageBottom: 'Alcalde Julio Pérez Cabrera.',
            exportOptions: { columns: [1, 2, 3, 4, 6, 7, 8, 9, 10] },
            excelStyles: [
              { template: ['blue_medium', 'header_blue', 'title_medium'] },
              { cells: '1', style: { font: { size: '18', b: !0 } } },
              {
                cells: '2',
                style: {
                  font: { size: '13', b: !0 },
                  alignment: { vertical: 'center', horizontal: 'center' },
                },
              },
              {
                cells: '3:',
                style: {
                  font: { size: '11', b: !1 },
                  alignment: { vertical: 'center', horizontal: 'center' },
                },
              },
              {
                cells: '-0',
                style: {
                  font: { size: '10', b: !0, lineHeight: 2 },
                  alignment: { vertical: 'center', horizontal: 'right' },
                },
              },
            ],
            pageStyle: {
              sheetPr: { pageSetUpPr: { fitToPage: 1 } },
              printOptions: {
                horizontalCentered: !0,
                verticalCentered: !0,
                orientation: 'landscape',
              },
              pageSetup: {
                orientation: 'landscape',
                paperSize: '9',
                fitToWidth: '1',
                fitToHeight: '0',
              },
              pageMargins: {
                left: '0.2',
                right: '0.2',
                top: '0.4',
                bottom: '0.4',
                header: '0',
                footer: '0',
              },
              repeatHeading: !0,
              repeatCol: 'A:A',
            },
          },
          {
            extend: 'pdfHtml5',
            customize: function (e) {
              (e.content[1].margin = [100, 20, 0, 20]),
                (e.content[2].margin = [100, 0, 100, 0]);
            },
            text: '<i class="fas fa-file-pdf icono-pdf"></i>',
            titleAttr: 'Exportar a PDF',
            title:
              'Reporte de Usuarios de Aplicación de Alertas - Municipalidad de Chicama',
            className: 'btn btn-danger',
            orientation: 'landscape',
            footer: !0,
            pageSize: 'A4',
            messageTop: 'Alcalde Julio Pérez Cabrera.',
            lengthChange: !1,
            exportOptions: {
              columns: [1, 2, 3, 4, 6, 7, 8, 9, 10],
              modifier: { page: 'current' },
            },
          },
        ],
      },
    });
  coleccionUsuarios.on('child_added', e => {
    let a;
    (a = '1' === e.child('tipoacceso').val() ? 'Serenazgo' : 'Ciudadano'),
      (o = [
        e.key,
        e.child('numerodocumento').val(),
        e.child('apellidos').val(),
        e.child('nombres').val(),
        e.child('correo').val(),
        e.child('clave').val(),
        e.child('direccion').val(),
        e.child('telefono').val(),
        e.child('fechanac').val(),
        e.child('sexo').val(),
        a,
      ]),
      i.rows.add([o]).draw();
  }),
    coleccionUsuarios.on('child_changed', a => {
      (o = [
        a.key,
        a.child('numerodocumento').val(),
        a.child('apellidos').val(),
        a.child('nombres').val(),
        a.child('correo').val(),
        a.child('clave').val(),
        a.child('direccion').val(),
        a.child('telefono').val(),
        a.child('fechanac').val(),
        a.child('sexo').val(),
        a.child('tipoacceso').val(),
      ]),
        i.row(e).data(o).draw();
    }),
    $('form').submit(function (e) {
      e.preventDefault();
      let t = $.trim($('#id').val()),
        o = $.trim($('#dni').val()),
        i = $.trim($('#nombres').val()),
        l = $.trim($('#apellidos').val()),
        r = $.trim($('#email').val()),
        n = $.trim($('#password').val()),
        s = $.trim($('#telefono').val()),
        c = $.trim($('#direccion').val()),
        d = $.trim($('#fecnac').val()),
        u = $.trim($('#tipo-usuario').val()),
        m = $.trim($('#sexo').val());
      if (o.length < 8)
        return (
          Swal.fire({
            icon: 'error',
            title: 'ATENCIÓN...',
            text: 'Usted esta ingresando menos de 8 dígitos en campo DNI.',
          }),
          !1
        );
      arregloConEmailUsurios.forEach(e => {
        if (r === e)
          return (
            console.log(`Antes de la comprobacion: ${a}`),
            (a = !0),
            console.log(`enviando desde el metodo que verifica: ${a}`)
          );
      });
      let p = t;
      if (!0 === a && '' == p)
        return (
          Swal.fire({
            icon: 'error',
            title: 'ATENCIÓN...',
            text: 'Usted esta intentando registrar un usuario con un correo ya existente por favor intente el registro con un nuevo correo, Gracias.',
          }),
          console.log(`esto es despues de mensaje correo repetido: ${a}`),
          (a = !1),
          console.log(
            `esto es despues de mensaje correo repetido de cambiar el valor: ${a}`,
          )
        );
      if (!0 === a && '' !== p)
        return (
          (data = {
            numerodocumento: o,
            nombres: i,
            apellidos: l,
            correo: r,
            clave: n,
            telefono: s,
            direccion: c,
            fechanac: d,
            imagen: '',
            sexo: m,
            tipoacceso: u,
            host: '1',
          }),
          (actualizacionData = {}),
          (actualizacionData[`/${p}`] = data),
          coleccionUsuarios.update(actualizacionData),
          (p = coleccionUsuarios.push().key),
          (t = ''),
          $('form').trigger('reset'),
          $('#modalAltaEdicion').modal('hide'),
          Swal.fire({
            icon: 'success',
            title: 'Datos de usuario actualizados correctamente',
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
          }),
          console.log(`Esto es despues de actualizar: ${a}`),
          (a = !1),
          console.log(`Esto es despues de actualizar y hacer el cambio: ${a}`)
        );
      if (!1 === a && '' === p) {
        !(function (e, a) {
          firebase
            .auth()
            .createUserWithEmailAndPassword(e, a)
            .then(r => {
              var n = r.user;
              let p = n.uid;
              console.log('uuid', p),
                (data = {
                  numerodocumento: o,
                  nombres: i,
                  apellidos: l,
                  correo: e,
                  clave: a,
                  telefono: s,
                  direccion: c,
                  fechanac: d,
                  imagen: '',
                  sexo: m,
                  tipoacceso: u,
                  host: '1',
                  token: p,
                }),
                (actualizacionData = {}),
                (actualizacionData[`/${p}`] = data),
                coleccionUsuarios.update(actualizacionData),
                (t = ''),
                $('form').trigger('reset'),
                $('#modalAltaEdicion').modal('hide'),
                console.info('Usuario creado correctamente', n),
                Swal.fire({
                  icon: 'success',
                  title: 'Usuario creado correctamente',
                  showClass: { popup: 'animate__animated animate__fadeInDown' },
                  hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                });
            })
            .catch(e => {
              var a = e.code,
                t = e.message;
              alert(`Error ${a} - ${t}`),
                Swal.fire({
                  icon: 'error',
                  title: 'ATENCIÓN...',
                  text: 'Usted esta intentando registrar un usuario con un correo ya existente por favor intente el registro con un nuevo correo, Gracias.',
                });
            });
        })(r, n),
          console.log(
            `Esto es despues de crear un nuevo usuario y hacer el cambio de valor desde el cuerpo de crear: ${a}`,
          );
      }
    }),
    $('#btnNuevo').click(function () {
      $('#id').val(''),
        $('#dni').val(''),
        $('#nombres').val(''),
        $('#apellidos').val(''),
        $('#email').val(''),
        $('#password').val(''),
        $('#telefono').val(''),
        $('#direccion').val(''),
        $('#fecnac').val(''),
        $('form').trigger('reset'),
        $('#modalAltaEdicion').modal('show');
    }),
    $('#tablaUsuarios').on('click', '.btnEditar', function () {
      e = i.row($(this).parents('tr'));
      let a = $('#tablaUsuarios').dataTable().fnGetData($(this).closest('tr')),
        t = a[0],
        o = $(this).closest('tr').find('td:eq(0)').text(),
        l = $(this).closest('tr').find('td:eq(1)').text(),
        r = $(this).closest('tr').find('td:eq(2)').text(),
        n = $(this).closest('tr').find('td:eq(3)').text(),
        s = a[5],
        c = $(this).closest('tr').find('td:eq(4)').text(),
        d = $(this).closest('tr').find('td:eq(5)').text(),
        u = $(this).closest('tr').find('td:eq(6)').text(),
        m = $(this).closest('tr').find('td:eq(7)').text(),
        p = $(this).closest('tr').find('td:eq(8)').text();
      $('#id').val(t),
        $('#dni').val(o),
        $('#nombres').val(r),
        $('#apellidos').val(l),
        $('#email').val(n),
        $('#password').val(s),
        $('#telefono').val(d),
        $('#direccion').val(c),
        $('#fecnac').val(u),
        $('#sexo').val(m),
        'Ciudadano' == p
          ? $('#tipo-usuario').val('2')
          : $('#tipo-usuario').val('1'),
        $('#modalAltaEdicion').modal('show');
    });
});
