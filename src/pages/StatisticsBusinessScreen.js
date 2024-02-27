import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-chart-kit';


const MONTHLY_COLORS = ['#FF5733', '#33FF57', '#5733FF', '#FF5733', '#33FF57', '#5733FF']; // Add more as needed
const YEARLY_COLORS = ['#FF5733', '#33FF57', '#5733FF']; // Add more as needed

const monthlyData = [
  { month: 'January', income: 500 },
  { month: 'February', income: 800 },
  { month: 'March', income: 1200 },
  // Add more months and incomes as needed
];

const yearlyData = [
  { name: 'Appointment Type 1', income: 3000 },
  { name: 'Appointment Type 2', income: 5000 },
  { name: 'Appointment Type 3', income: 2000 },
  // Add more appointment types and incomes as needed
];

const chartConfig = {
  backgroundGradientFrom: '#f8f8f8',
  backgroundGradientTo: '#f8f8f8',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const StatisticsScreen = () => {
  const [showMonthlyChart, setShowMonthlyChart] = useState(true);

  const data = showMonthlyChart ? monthlyData : yearlyData;
  const totalIncome = data.reduce((sum, item) => sum + item.income, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Financial Summary</Text>

      <TouchableOpacity
        style={[styles.toggleButton, { backgroundColor: showMonthlyChart ? '#4CAF50' : '#2196F3' }]}
        onPress={() => setShowMonthlyChart(!showMonthlyChart)}
      >
        <Text style={styles.toggleButtonText}>
          {showMonthlyChart ? 'Switch to Yearly Chart' : 'Switch to Monthly Chart'}
        </Text>
      </TouchableOpacity>

      <View style={styles.amountContainer}>
        <Text style={styles.amountText}>₪10,478.16</Text>
      </View>

      {/* Display expense rows */}
      {/* Example: */}
      <View style={styles.expenseRow}>
        <Text style={styles.expenseCategory}>עסקאות חוזרות</Text>
        <Text style={styles.expenseAmount}>₪3,818.83</Text>
      </View>
      {/* Add more rows as needed */}

      {/* Display the colorful pie chart */}
      <PieChart
        data={data.map((item, index) => ({
          name: showMonthlyChart ? item.month : item.name,
          income: item.income,
          color: showMonthlyChart ? MONTHLY_COLORS[index] : YEARLY_COLORS[index],
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
