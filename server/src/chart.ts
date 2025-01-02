import { Server } from 'socket.io';
import moment from 'moment';

class Chart {
  private pieChartData: { category: string; value: number }[];
  private barChartData: { date: string; value: number }[];

  constructor() {
    this.pieChartData = this.generatePieChartData();
    this.barChartData = this.generateBarChartData();
  }

  private generateRandomDate(): string {
    const startDate = moment('2024-01-01');
    const endDate = moment('2025-12-31');
    const randomDays = Math.floor(Math.random() * endDate.diff(startDate, 'days'));
    return startDate.add(randomDays, 'days').format('YYYY-MM-DD');
  }

  private generatePieChartData(): { category: string; value: number }[] {
    const categories = ['Hydration', 'Nutrition', 'Other'];
    return categories.map((category) => ({
      category,
      value: Math.floor(Math.random() * 100),
    }));
  }

  private generateBarChartData(): { date: string; value: number }[] {
    const dataList = [];
    for (let i = 0; i < 420; i++) {
      const randomDate = this.generateRandomDate();
      const randomValue = Math.floor(Math.random() * 100) + 1;
      dataList.push({
        date: randomDate,
        value: randomValue,
      });
    }
    return dataList;
  }

  public setupSocket(io: Server): void {
    setInterval(() => {
      this.pieChartData = this.generatePieChartData();
      this.barChartData = this.generateBarChartData();

      io.emit('pie-chart-update', this.pieChartData);
      io.emit('bar-chart-update', this.barChartData);
    }, 8000);

    io.on('connection', (socket) => {
      socket.emit('pie-chart-update', this.pieChartData);
      socket.emit('bar-chart-update', this.barChartData);
      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });
  }
}

export default Chart;
