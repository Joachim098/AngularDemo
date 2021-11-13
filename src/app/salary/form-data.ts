export class FormData{
     currency: string[] = ['ZAR', 'USD', 'EUR', 'CAD', 'DKK'];
     listYear: string[] = [
       '2021/2022','2020/2021','2019/2020','2018/2019','2017/2018','2016/2017',
       '2015/2016','2014/2015','2013/2014','2012/2013','2011/2012','2010/2011'
      ];
      options: string[] = ['Enter for full Tax Year', 'Enter per Month', 'Enter per Specific Date']
      listMonth: string [] = []
      daylist: number[] = [];
      months: string[] = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
      years: number[] = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

      displayFormInputData(){
        let i: number = 0;
        let x: number = 0;
        for (i=0; i<this.years.length; i++){
            for(x=0; x<this.months.length; x++){
                this.listMonth.push(this.months[x]+ "-"+ this.years[i]);
            }
        }
        this.listMonth.reverse(); 
        let y: number = 1;
        for (y; y<32; y++){
            this.daylist.push(y);
        }
    }
}