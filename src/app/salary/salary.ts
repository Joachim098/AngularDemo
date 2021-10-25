
export class Salary{
     company: string = '';
     amount: number = 0;
     currency: string[] = ['ZAR', 'USD', 'EUR', 'CAD', 'DKK'];
     listYear: any[] = [
        {'year': '2021/2022'}, {'year': '2020/2021'}, {'year': '2019/2020'}, {'year': '2018/2019'},
        {'year': '2017/2018'}, {'year': '2016/2017'},{'year': '2015/2016'},{'year': '2014/2015'},
        {'year': '2013/2014'}, {'year': '2012/2013'}, {'year': '2011/2012'},{'year': '2010/2011'}
      ];
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