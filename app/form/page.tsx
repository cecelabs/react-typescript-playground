"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';

// Definir tipos para los datos del formulario
interface FormData {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
  telefono: string;
  pais: string;
  suscripcion: boolean;
}

// Definir tipos para los errores de validación
interface FormErrors {
  nombre?: string;
  email?: string;
  asunto?: string;
  mensaje?: string;
  telefono?: string;
}

export default function FormularioContactoPage() {
  // Estado para los datos del formulario
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: '',
    telefono: '',
    pais: 'es',
    suscripcion: false,
  });

  // Estado para los errores de validación
  const [errors, setErrors] = useState<FormErrors>({});

  // Estado para el envío del formulario
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Manejar cambios en los campos del formulario
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  // Validar el formulario
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    } else if (formData.nombre.length < 2) {
      newErrors.nombre = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.asunto.trim()) {
      newErrors.asunto = 'El asunto es obligatorio';
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es obligatorio';
    } else if (formData.mensaje.length < 10) {
      newErrors.mensaje = 'El mensaje debe tener al menos 10 caracteres';
    }

    if (formData.telefono && !/^[0-9+\-\s]+$/.test(formData.telefono)) {
      newErrors.telefono = 'El teléfono solo puede contener números, +, - y espacios';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // En un caso real, aquí harías una petición HTTP a tu API
      // Ejemplo:
      // const response = await fetch('/api/contacto', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });

      // Simulamos una petición de red
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Datos enviados:', formData);
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Resetear el formulario después de 3 segundos
      setTimeout(() => {
        setFormData({
          nombre: '',
          email: '',
          asunto: '',
          mensaje: '',
          telefono: '',
          pais: 'es',
          suscripcion: false,
        });
        setIsSubmitted(false);
      }, 3000);

    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setIsSubmitting(false);
      alert('Hubo un error al enviar el formulario. Por favor, inténtelo de nuevo.');
    }
  };

  // Resetear el formulario
  const handleReset = () => {
    setFormData({
      nombre: '',
      email: '',
      asunto: '',
      mensaje: '',
      telefono: '',
      pais: 'es',
      suscripcion: false,
    });
    setErrors({});
    setIsSubmitted(false);
  };

  // Estilos en línea
  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '30px',
      backgroundColor: '#f8f9fa',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    } as React.CSSProperties,
    title: {
      color: '#2c3e50',
      marginBottom: '10px',
      textAlign: 'center' as const,
      fontSize: '28px',
    } as React.CSSProperties,
    subtitle: {
      color: '#7f8c8d',
      textAlign: 'center' as const,
      marginBottom: '30px',
      fontSize: '16px',
    } as React.CSSProperties,
    form: {
      display: 'flex',
      flexDirection: 'column' as const,
    } as React.CSSProperties,
    formGroup: {
      marginBottom: '20px',
    } as React.CSSProperties,
    formRow: {
      display: 'flex',
      gap: '20px',
      marginBottom: '20px',
    } as React.CSSProperties,
    formGroupHalf: {
      flex: '1',
    } as React.CSSProperties,
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: '600',
      color: '#2c3e50',
      fontSize: '14px',
    } as React.CSSProperties,
    input: {
      width: '100%',
      padding: '12px 15px',
      border: '1px solid #ddd',
      borderRadius: '6px',
      fontSize: '16px',
      transition: 'border-color 0.3s, box-shadow 0.3s',
      boxSizing: 'border-box' as const,
    } as React.CSSProperties,
    inputError: {
      borderColor: '#e74c3c',
      boxShadow: '0 0 0 2px rgba(231, 76, 60, 0.2)',
    } as React.CSSProperties,
    textarea: {
      width: '100%',
      padding: '12px 15px',
      border: '1px solid #ddd',
      borderRadius: '6px',
      fontSize: '16px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      resize: 'vertical' as const,
      transition: 'border-color 0.3s, box-shadow 0.3s',
      boxSizing: 'border-box' as const,
    } as React.CSSProperties,
    select: {
      width: '100%',
      padding: '12px 15px',
      border: '1px solid #ddd',
      borderRadius: '6px',
      fontSize: '16px',
      backgroundColor: 'white',
      transition: 'border-color 0.3s',
      boxSizing: 'border-box' as const,
    } as React.CSSProperties,
    checkboxLabel: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      color: '#2c3e50',
    } as React.CSSProperties,
    checkbox: {
      marginRight: '10px',
      width: '18px',
      height: '18px',
    } as React.CSSProperties,
    buttonGroup: {
      display: 'flex',
      gap: '15px',
      marginTop: '10px',
      marginBottom: '15px',
    } as React.CSSProperties,
    submitButton: {
      flex: '3',
      padding: '14px 20px',
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.3s, transform 0.2s',
    } as React.CSSProperties,
    disabledButton: {
      backgroundColor: '#95a5a6',
      cursor: 'not-allowed',
    } as React.CSSProperties,
    resetButton: {
      flex: '1',
      padding: '14px 20px',
      backgroundColor: '#f1f1f1',
      color: '#333',
      border: '1px solid #ddd',
      borderRadius: '6px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    } as React.CSSProperties,
    errorText: {
      color: '#e74c3c',
      fontSize: '14px',
      marginTop: '5px',
      display: 'block',
    } as React.CSSProperties,
    requiredNote: {
      fontSize: '14px',
      color: '#7f8c8d',
      textAlign: 'center' as const,
      fontStyle: 'italic',
    } as React.CSSProperties,
    successMessage: {
      backgroundColor: '#d4edda',
      color: '#155724',
      padding: '25px',
      borderRadius: '8px',
      textAlign: 'center' as const,
      border: '1px solid #c3e6cb',
    } as React.CSSProperties,
    dataList: {
      textAlign: 'left' as const,
      listStyleType: 'none',
      padding: '0',
      marginTop: '20px',
    } as React.CSSProperties,
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Formulario de Contacto</h1>
      <p style={styles.subtitle}>Complete el formulario y nos pondremos en contacto con usted</p>

      {isSubmitted ? (
        <div style={styles.successMessage}>
          <h3>¡Formulario enviado con éxito!</h3>
          <p>Gracias por contactarnos. Le responderemos en breve.</p>
          <p>Los datos enviados fueron:</p>
          <ul style={styles.dataList}>
            <li><strong>Nombre:</strong> {formData.nombre}</li>
            <li><strong>Email:</strong> {formData.email}</li>
            <li><strong>Asunto:</strong> {formData.asunto}</li>
            <li><strong>País:</strong> {formData.pais === 'es' ? 'España' : formData.pais === 'mx' ? 'México' : formData.pais === 'ar' ? 'Argentina' : 'Otro'}</li>
            <li><strong>Suscripción:</strong> {formData.suscripcion ? 'Sí' : 'No'}</li>
          </ul>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={styles.form} noValidate>
          <div style={styles.formGroup}>
            <label htmlFor="nombre" style={styles.label}>
              Nombre Completo *
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              style={errors.nombre ? { ...styles.input, ...styles.inputError } : styles.input}
              placeholder="Ingrese su nombre"
            />
            {errors.nombre && <span style={styles.errorText}>{errors.nombre}</span>}
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Correo Electrónico *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={errors.email ? { ...styles.input, ...styles.inputError } : styles.input}
              placeholder="ejemplo@correo.com"
            />
            {errors.email && <span style={styles.errorText}>{errors.email}</span>}
          </div>

          <div style={styles.formRow}>
            <div style={styles.formGroupHalf}>
              <label htmlFor="telefono" style={styles.label}>
                Teléfono
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                style={errors.telefono ? { ...styles.input, ...styles.inputError } : styles.input}
                placeholder="+34 123 456 789"
              />
              {errors.telefono && <span style={styles.errorText}>{errors.telefono}</span>}
            </div>

            <div style={styles.formGroupHalf}>
              <label htmlFor="pais" style={styles.label}>
                País
              </label>
              <select
                id="pais"
                name="pais"
                value={formData.pais}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="es">España</option>
                <option value="mx">México</option>
                <option value="ar">Argentina</option>
                <option value="co">Colombia</option>
                <option value="otro">Otro</option>
              </select>
            </div>
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="asunto" style={styles.label}>
              Asunto *
            </label>
            <input
              type="text"
              id="asunto"
              name="asunto"
              value={formData.asunto}
              onChange={handleChange}
              style={errors.asunto ? { ...styles.input, ...styles.inputError } : styles.input}
              placeholder="Motivo de su consulta"
            />
            {errors.asunto && <span style={styles.errorText}>{errors.asunto}</span>}
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="mensaje" style={styles.label}>
              Mensaje *
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              rows={5}
              style={errors.mensaje ? { ...styles.textarea, ...styles.inputError } : styles.textarea}
              placeholder="Escriba su mensaje aquí..."
            />
            {errors.mensaje && <span style={styles.errorText}>{errors.mensaje}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="suscripcion"
                checked={formData.suscripcion}
                onChange={handleChange}
                style={styles.checkbox}
              />
              <span>Deseo suscribirme al boletín de noticias</span>
            </label>
          </div>

          <div style={styles.buttonGroup}>
            <button
              type="submit"
              style={isSubmitting ? { ...styles.submitButton, ...styles.disabledButton } : styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              style={styles.resetButton}
            >
              Limpiar Formulario
            </button>
          </div>

          <div style={styles.requiredNote}>
            * Campos obligatorios
          </div>
        </form>
      )}
    </div>
  );
}