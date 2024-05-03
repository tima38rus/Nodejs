<template>
  <div>
  <h1 class="display-4 t">Студенты</h1>
  <br />
  <table id="table" border="1">
    <thead>
      <tr>
        <th>Имя</th>
        <th>Фамилия</th>
        <th>Отчество</th>
        <th>Группа</th>
        <th>Балл</th>
        <th>Рост</th>
        <th>Дата Рождения</th>
        <th>Стипендия</th>
        <th>Билет</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="student in students" :key="student.id">
        <td>{{ student.Name }}</td>
        <td>{{ student.secondName }}</td>
        <td>{{ student.thirdName }}</td>
        <td>{{ student.groop }}</td>
        <td>{{ student.mark }}</td>
        <td>{{ student.heigh }}</td>
        <td>{{ student.date }}</td>
        <td>{{ student.pay }}</td>
        <td>{{ student.ticket }}</td>
      </tr>
    </tbody>
  </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      students: [
        {
          Name: 'Роман',
          secondName: 'Куриян1222',
          thirdName: 'Денисович',
          groop: 'И-21-1',
          mark: 5,
          heigh: '175',
          date: new Date(2004, 11, 2).toLocaleString('ru', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }),
          pay: 2500,
          ticket: true
        },
        {
          Name: 'Алексей',
          secondName: 'Катырев',
          thirdName: 'Александрович',
          groop: 'И-21-1',
          mark: 4,
          heigh: '145',
          date: new Date(2005, 1, 21).toLocaleString('ru', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }),
          pay: 2000,
          ticket: true
        },
        {
          Name: 'Егор',
          secondName: 'Кузьменко',
          thirdName: 'Евгеньевич',
          groop: 'И-21-1',
          mark: 3,
          heigh: '180',
          date: new Date(2005, 11, 2).toLocaleString('ru', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }),
          pay: 600,
          ticket: false
        },
        {
          Name: 'Артем',
          secondName: 'Калинин',
          thirdName: 'Докапалович',
          groop: 'И-20-1',
          mark: 2,
          heigh: '185',
          date: new Date(2006, 4, 3).toLocaleString('ru', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }),
          pay: 0,
          ticket: false
        },
        {
          Name: 'Никита',
          secondName: 'Рябцев',
          thirdName: 'АгаУгу',
          groop: 'И-21-2',
          mark: 5,
          heigh: '170',
          date: new Date(1999, 11, 2).toLocaleString('ru', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }),
          pay: 12000,
          ticket: true
        },
        {
          Name: 'Роман',
          secondName: 'Мурка',
          thirdName: 'АгаУгу',
          groop: 'И-21-2',
          mark: 5,
          heigh: '193',
          date: new Date(1999, 11, 2).toLocaleString('ru', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }),
          pay: 12000,
          ticket: true
        },
        {
          Name: 'Артур',
          secondName: 'Нетушкин',
          thirdName: 'СкубиСкубиДу',
          groop: 'И-23-2',
          mark: 5,
          heigh: '180',
          date: new Date(1999, 11, 2).toLocaleString('ru', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }),
          pay: 4000,
          ticket: false
        },
        {
          Name: 'Саня!',
          secondName: 'Бондаж',
          thirdName: 'СкреппиСкреппиДу',
          groop: 'И-21-2',
          mark: 5,
          heigh: '176',
          date: new Date(1999, 11, 2).toLocaleString('ru', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }),
          pay: 300,
           ticket: false
        }
      ]
    }
  }
}
</script>