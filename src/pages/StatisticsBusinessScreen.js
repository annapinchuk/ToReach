import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
// import MonthPicker from 'react-native-month-year-picker';
// import DateTimePicker from '@react-native-community/datetimepicker';
import { StatusBar } from "expo-status-bar";
import { app, auth, db } from '../firebaseConfig';
import { collection, doc, getDocs, getDoc, query, where, orderBy } from '@firebase/firestore';
import DatePicker from '../components/DatePicker';


// import moment from 'moment'; 

let MONTHLY_COLORS = []; // Add more as needed

let totalIncomeYear = 0;
let totalIncomeMonth = 0;

const YEARLY_COLORS = ['#FF5733', '#33FF57', '#5733FF']; // Add more as needed

let monthStatsData = [];

let yearlyData = [];

const chartConfig = {
  backgroundGradientFrom: '#f8f8f8',
  backgroundGradientTo: '#f8f8f8',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const StatisticsScreen = () => {

  // ================================== Orel ==========================
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');


  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 1;
  const maxYear = currentYear + 1;


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    // setShow(false);
    setDate(currentDate);
    adjustGraph(currentDate);
  };

  const showDatePicker = () => {
    setShow(true);
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
  
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    const exists = MONTHLY_COLORS.find(item => item === color);

    if (exists) {
      return getRandomColor();
    }
    else {
      MONTHLY_COLORS.push(color);
    }
  
    return color;
  };


  const areDatesInSameMonth = (date1, date2) => {
    return (
      date1.getMonth() === date2.getMonth()
    );
  };

  const areDatesInSameYear = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const adjustGraph = async (currentDate) => {

    try {
      // bzero stats
      monthStatsData = [];
      yearlyData = [];
      totalIncomeYear = 0;
      totalIncomeMonth = 0;

      // Retrieve snapshot
      const { uid } = auth.currentUser;
      const appointmentsCollection = collection(db, 'Appointments');
      const appointmentsQuery = query(
          appointmentsCollection,
          where('businessID', '==', uid),
      );
      
      // Get appointments from Firestore
      const appointmentsSnapshot = await getDocs(appointmentsQuery);

      const appointmentsData = appointmentsSnapshot.docs.map(
        (doc) => ({
          businessID: doc.data.businessID,
          clientID: doc.data.clientID,
          endTime: doc.data().endTime,
          name: doc.data().name,
          price: doc.data().price,
          startTime: doc.data().startTime,
        })
      );

      appointmentsData.forEach((appointment) => {
        console.log("Name:", appointment.name);
        let date1 = appointment.endTime.toDate();
        let date2 =  currentDate;

        // if (showMonthlyChart) {
          if (areDatesInSameYear(date1, date2)) {

            totalIncomeYear += appointment.price;
            const nameIndex2 = yearlyData.findIndex(item => item.name === appointment.name);

            if (nameIndex2 !== -1) {
              yearlyData[nameIndex2].income += appointment.price;

              // stats[appointment.name] += appointment.price;
            }
            else {
              yearlyData.push({name: appointment.name, income: appointment.price})
              // stats[appointment.name] = appointment.price;
            }

            if (areDatesInSameMonth(date1, date2)) {
              totalIncomeMonth += appointment.price;
              // totalIncome += appointment.price;
  
              const nameIndex = monthStatsData.findIndex(item => item.name === appointment.name);
  
              if (nameIndex !== -1) {
                monthStatsData[nameIndex].income += appointment.price;
  
                // stats[appointment.name] += appointment.price;
              }
              else {
                monthStatsData.push({name: appointment.name, income: appointment.price})
                // stats[appointment.name] = appointment.price;
              }
            }
          }
      });
      console.log("\n\nsum:", totalIncomeYear, "\n-------------------\n");
      console.log("\n\nsum:", totalIncomeMonth, "\n-------------------\n");
      console.log("\n\nmonthStatsData:", monthStatsData, "\n-------------------\n");
      console.log("\n\nyearlyData:", yearlyData, "\n-------------------\n");
      console.log("\n\nid:", uid, "\n-------------------\n");

      // monthlyData = stats;
    }
    catch (err) {
      console.log(err);
    }

  }

  // ================================== Orel ==========================
  const [pokemon,setPokemon] = useState();


  const [showMonthlyChart, setShowMonthlyChart] = useState(true);

  let data = showMonthlyChart ? monthStatsData : yearlyData;
  // const totalIncome = data.reduce((sum, item) => sum + item.income, 0);


  return (
    <View style={styles.container}>

    <View style={styles.rowContainer}>

      {/* <DateTimePicker
        value={date}
        mode={"date"}
        is24Hour={true}
        onChange={onChange}
      /> */}


      <DatePicker date={date} setDate={onChange} />

    
      <TouchableOpacity
        style={[styles.toggleButton, { backgroundColor: showMonthlyChart ? '#4CAF50' : '#2196F3' }]}
        onPress={() => {
          setShowMonthlyChart(!showMonthlyChart);
        }}
      >
        <Text style={styles.toggleButtonText}>
          {'החל שינויים'}
        </Text>
      </TouchableOpacity>
    </View>


      {/* Display expense rows */}
      {/* Example: */}
      <View style={styles.expenseRow}>
        <Text style={styles.expenseCategory}>מחזור חודשי</Text>
        <Text style={styles.expenseAmount}>₪{totalIncomeMonth}</Text>
      </View>
      {/* Add more rows as needed */}

      {/* Display the colorful pie chart */}
      <PieChart
        data={monthStatsData.map((item, index) => ({
          name: item.name,
          income: item.income,
          // color: showMonthlyChart ? MONTHLY_COLORS[index] : YEARLY_COLORS[index],
          color: getRandomColor()
        }))}
        width={350}
        height={200}
        chartConfig={chartConfig}
        accessor="income"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />

      <View style={styles.expenseRow}>
        <Text style={styles.expenseCategory}>מחזור שנתי</Text>
        <Text style={styles.expenseAmount}>₪{totalIncomeYear}</Text>
      </View>

      <PieChart
        data={yearlyData.map((item, index) => ({
          name: item.name,
          income: item.income,
          // color: showMonthlyChart ? MONTHLY_COLORS[index] : YEARLY_COLORS[index],
          color: getRandomColor()
        }))}
        width={350}
        height={200}
        chartConfig={chartConfig}
        accessor="income"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: '',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  toggleButton: {
    padding: 10,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 16,
  },
  toggleButtonText: {
    color: '#ffffff',
  },
  amountContainer: {
    backgroundColor: '#E6F7FF',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  amountText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  expenseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  expenseCategory: {
    fontSize: 16,
    color: '#333',
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default StatisticsScreen;
