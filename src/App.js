import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Swal from 'sweetalert2'

function App() {
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Nama lengkap harus diisi.'),
    email: Yup.string().required('Email harus diisi.').email('Email tidak valid.'),
    numberPhone: Yup.string().required('Nomor handphone harus diisi.'),
    dateOfBirth: Yup.string().required('Tanggal lahir harus diisi.'),
    education: Yup.string().required('Pendidikan harus diisi.'),
    // major: Yup.string().required('Jurusan harus diisi.'),
    address: Yup.string().required('Alamat harus diisi.'),
    codingExperience: Yup.string().required('Pengalaman koding harus diisi.'),
    // experienceDetail: Yup.string().required("Detail pengalaman harus diisi."),
    reasonsToJoinBootcamp: Yup.string().required("Alasan ikut bootcamp harus diisi.")
  });

  const [strataSelected, setStrataSelected] = useState(false);
  const [experienceSelected, setExperienceSelected] = useState(false);
  const [educationSelected, setEducationSelected] = useState(false);
  const [experienceCodeSelected, setExperienceCodeSelected] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = async (data) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data })
    };

    const response = await fetch('https://masterofweb-be-api.masterof.website/api/bootcamp-participants', requestOptions);

    if (!response.ok) {
      Swal.fire({
        title: 'Error!',
        text: 'Sepertinya ada kesalahan teknis',
        icon: 'error',
        confirmButtonText: 'Coba Lagi'
      })
    }

    // const dataJSON = await response.json();

    Swal.fire(
      'Sukses!',
      'Pendaftaran sukses brohh',
      'success'
    )

    await reset();
  };

  const handleEducationChanged = (e) => {
    const value = e.target.value;

    console.log("value", value);

    if (value === 'S1' || value === "S2") return setStrataSelected(true);
    if (value !== 'S1' || value !== 'S2') return setStrataSelected(false);
  }

  const handleExperienceChanged = (e) => {
    const value = e.target.value;

    console.log(value);

    if (value === 'Ada') return setExperienceSelected(true);
    if (value === 'Belum Ada') return setExperienceSelected(false);
  }

  return (
    <div className="register-form">
      <img src="https://masterofweb-be-api.masterof.website/uploads/wpl_1067878abf.jpg" alt="Logo Web Programming Lampung" height={40} />
      <label style={{ padding: 10 }}>X</label>
      <img src="https://masterof.website/static/media/logo.c459a5fd2b049d56b55c.png" alt="Logo Masterof Website" height={40} />
      <br />
      <br />
      <h1>Pedaftaran Mini Bootcamp Fullstack JavaScript - Batch 1</h1>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Nama Lengkap</label>
          <input
            name="fullName"
            type="text"
            {...register('fullName')}
            className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.fullName?.message}</div>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            type="text"
            {...register('email')}
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
        </div>

        <div className="form-group">
          <label>No. HP (WhatsApp)</label>
          <input
            name="numberPhone"
            type="number"
            {...register('numberPhone')}
            className={`form-control ${errors.numberPhone ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.numberPhone?.message}</div>
        </div>

        <div className="form-group">
          <label>Tanggal Lahir</label>
          <input
            name="dateOfBirth"
            type="date"
            {...register('dateOfBirth')}
            className={`form-control ${errors.dateOfBirth ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.dateOfBirth?.message}</div>
        </div>

        <div className="form-group">
          <label>Pendidikan</label>
          <select
            className={`form-control ${errors.education && !educationSelected ? 'is-invalid' : ''}`}
            name="education"
            {...register('education')}
            onChange={(e) => {
              handleEducationChanged(e)
              setEducationSelected(true);
            }}
            defaultValue=""
          >
            <option value="" disabled>-- Pilih Pendidikan --</option>
            <option value="SMP">SMP</option>
            <option value="SMA">SMA</option>
            <option value="S1">S1</option>
            <option value="S2">S2</option>
          </select>
          <div className="invalid-feedback">{errors.education && !educationSelected ? errors.education.message : ''}</div>
        </div>

        {strataSelected && (
          <div className="form-group">
            <label>Jurusan</label>
            <input
              name="major"
              type="text"
              {...register('major')}
              className={`form-control ${errors.major ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.major?.message}</div>
          </div>
        )}

        <div className="form-group">
          <label>Alamat Lengkap</label>
          <textarea
            name="address"
            {...register('address')}
            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.address?.message}</div>
        </div>

        <div className="form-group">
          <label>Pengalaman Koding</label>
          <select
            className={`form-control ${errors.codingExperience && !experienceCodeSelected ? 'is-invalid' : ''}`}
            name="codingExperience"
            {...register('codingExperience')}
            onChange={(e) => {
              handleExperienceChanged(e);
              setExperienceCodeSelected(true);
            }}
            defaultValue=""
          >
            <option value="" disabled>-- Pilih Pengalaman --</option>
            <option value="Ada">Ada</option>
            <option value="Tidak Ada">Tidak Ada</option>
          </select>
          <div className="invalid-feedback">{errors.codingExperience && !experienceCodeSelected ? errors.codingExperience.message : ''}</div>
        </div>

        {experienceSelected && (
          <div className="form-group">
            <label>Pernah Belajar Apa Saja?</label>
            <textarea
              name="experienceDetail"
              {...register('experienceDetail')}
              className={`form-control ${errors.experienceDetail ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.experienceDetail?.message}</div>
          </div>
        )}

        <div className="form-group">
          <label>Alasan Ikut Bootcamp</label>
          <textarea
            name="reasonsToJoinBootcamp"
            {...register('reasonsToJoinBootcamp')}
            className={`form-control ${errors.reasonsToJoinBootcamp ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.reasonsToJoinBootcamp?.message}</div>
        </div>

        <p>
          * Pastikan semua tidak ada yang kosong
        </p>
        <br />

        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Daftar Sekarang
          </button>
          <button
            type="button"
            onClick={reset}
            className="btn btn-warning float-right"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default App;
