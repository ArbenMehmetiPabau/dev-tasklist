// Frontend/app/src/app/new-booking/page.tsx
"use client";  // Add this line at the top

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';  // Use 'next/navigation'

const NewBooking: React.FC = () => {
  const [form, setForm] = useState({
    service: '',
    doctor_name: '',
    start_time: '',
    end_time: '',
    date: '',
  });
  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    try {
      const res = await fetch('http://host.docker.internal:5001/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push('/');  // Redirect to home on success
      } else {
        const errorData = await res.json();
        setErrors([errorData.error || 'Unknown error occurred']);
      }
    } catch (err) {
      setErrors([err.message]);
    }
  };

  return (
    <div>
      <h1>New Booking</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Service:
          <input type="text" name="service" value={form.service} onChange={handleChange} required />
        </label>
        <label>
          Doctor Name:
          <input type="text" name="doctor_name" value={form.doctor_name} onChange={handleChange} required />
        </label>
        <label>
          Start Time:
          <input type="time" name="start_time" value={form.start_time} onChange={handleChange} required />
        </label>
        <label>
          End Time:
          <input type="time" name="end_time" value={form.end_time} onChange={handleChange} required />
        </label>
        <label>
          Date:
          <input type="date" name="date" value={form.date} onChange={handleChange} required />
        </label>
        <button type="submit">Submit</button>
      </form>
      {errors.length > 0 && (
        <div>
          <h2>Errors:</h2>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NewBooking;