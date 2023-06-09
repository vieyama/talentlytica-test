import { useState } from "react";
import Head from "next/head";
import Image from "next/image";

import SelectAspect from "../components/SelectAspect";

const dummyUser = [
  {
    name: "Adam Aguirre",
    id: "3500559C-3C5F-4355-2AE7-4111F8B75D26",
    aspect1: 1,
    aspect2: 1,
    aspect3: 1,
    aspect4: 1,
  },
  {
    name: "Kieran Mathews",
    id: "F8C88725-A8B5-67B4-991E-B67C274546BA",
    aspect1: 1,
    aspect2: 1,
    aspect3: 1,
    aspect4: 1,
  },
  {
    name: "Dale Brennan",
    id: "CE3B3237-B41D-B03C-650A-943136E62375",
    aspect1: 1,
    aspect2: 1,
    aspect3: 1,
    aspect4: 1,
  },
  {
    name: "Halee Wagner",
    id: "0236BA39-B852-D13A-A773-D597AC845A24",
    aspect1: 1,
    aspect2: 1,
    aspect3: 1,
    aspect4: 1,
  },
  {
    name: "Britanney Tucker",
    id: "D8C853E9-6C95-9B61-7D8E-BF6A51C93C32",
    aspect1: 1,
    aspect2: 1,
    aspect3: 1,
    aspect4: 1,
  },
];

const HomeView = () => {
  const [students, setStudents] = useState(dummyUser);
  const [dataAspectFinal, setDataAspectFinal] = useState();

  const handleChangeAssessment = (event, userId) => {
    const aspectValueName = event.target.name;
    const aspectValue = event.target.value;

    const editData = students.map((item) =>
      item.id === userId && aspectValueName
        ? { ...item, [aspectValueName]: aspectValue }
        : item
    );

    setStudents(editData);
  };

  const handleSaveAssessment = () => {
    let aspectsFinal = {};
    for (let index = 0; index < 4; index++) {
      aspectsFinal[`aspek_penilaian_${index + 1}`] = students
        .map((item, key) => ({
          aspect: Number(item[`aspect${index + 1}`]),
          key: `mahasiswa_${key + 1}`,
        }))
        .reduce(
          (obj, item) => Object.assign(obj, { [item.key]: item.aspect }),
          {}
        );
    }
    return setDataAspectFinal(aspectsFinal);
  };

  return (
    <div className="container">
      <Head>
        <title>Aplikasi Penilaian Mahasiswa</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <p className="description">Aplikasi Penilaian Mahasiswa</p>

        <table className="student-table">
          <thead>
            <tr>
              <th></th>
              <th>Aspek Penilaian 1</th>
              <th>Aspek Penilaian 2</th>
              <th>Aspek Penilaian 3</th>
              <th>Aspek Penilaian 4</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="student-body">
                <td>
                  <div className="user-wrapper">
                    <Image
                      width={25}
                      height={25}
                      src="/assets/avatar.png"
                      alt="student-assessment-avatar"
                    />
                    {student.name}
                  </div>
                </td>
                <td>
                  <SelectAspect
                    aspectName="aspect1"
                    onChange={(event) =>
                      handleChangeAssessment(event, student.id)
                    }
                  />
                </td>
                <td>
                  <SelectAspect
                    aspectName="aspect2"
                    onChange={(event) =>
                      handleChangeAssessment(event, student.id)
                    }
                  />
                </td>
                <td>
                  <SelectAspect
                    aspectName="aspect3"
                    onChange={(event) =>
                      handleChangeAssessment(event, student.id)
                    }
                  />
                </td>
                <td>
                  <SelectAspect
                    aspectName="aspect4"
                    onChange={(event) =>
                      handleChangeAssessment(event, student.id)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="button-save-wrapper">
          <button className="button-save" onClick={handleSaveAssessment}>
            Simpan
          </button>
        </div>
        {dataAspectFinal && JSON.stringify(dataAspectFinal)}
      </main>
    </div>
  );
};

export default HomeView;
