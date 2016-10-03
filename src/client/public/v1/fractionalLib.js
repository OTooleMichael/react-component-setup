var fractionalReference = [
        [1.1, "1/10"],
        [1.11, "1/9"],
        [1.12, "1/8"],
        [1.14, "1/7"],
        [1.17, "1/6"],
        [1.2, "1/5"],
        [1.22, "2/9"],
        [1.25, "1/4"],
        [1.29, "2/7"],
        [1.3, "3/10"],
        [1.32, "1/3"],
        [1.33, "1/3"],
        [1.36, "4/11"],
        [1.4, "2/5"],
        [1.44, "4/9"],
        [1.5, "1/2"],
        [1.53, "8/15"],
        [1.57, "4/7"],
        [1.62, "8/13"],
        [1.67, "4/6"],
        [1.72, "8/11"],
        [1.73, "8/11"],
        [1.8, "4/5"],
        [1.83, "5/6"],
        [1.82, "5/6"],
        [1.91, "10/11"],
        [2, "1/1"],
        [2.1, "11/10"],
        [2.2, "6/5"],
        [2.25, "5/4"],
        [2.38, "11/8"],
        [2.37, "11/8"],
        [2.5, "3/2"],
        [2.63, "13/8"],
        [2.62, "13/8"],
        [2.75, "7/4"],
        [2.8, "9/5"],
        [2.86, "15/8"],
        [2.88, "15/8"],
        [3, "2/1"],
        [3.12, "17/8"],
        [3.2, "11/5"],
        [3.25, "9/4"],
        [3.4, "12/5"],
        [3.5, "5/2"],
        [3.6, "13/5"],
        [3.75, "11/4"],
        [4, "3/1"],
        [4.33, "10/3"],
        [4.5, "7/2"],
        [5, "4/1"],
        [5.5, "9/2"],
        [6, "5/1"],
        [6.5, "11/2"],
        [7, "6/1"],
        [7.5, "13/2"],
        [8, "7/1"],
        [8.5, "15/2"],
        [9, "8/1"],
        [9.5, "17/2"],
        [10, "9/1"],
        [11, "10/1"],
        [12, "11/1"],
        [13, "12/1"],
        [15, "14/1"],
        [16, "15/1"],
        [17, "16/1"],
        [19, "18/1"],
        [21, "20/1"],
        [26, "25/1"],
        [34, "33/1"],
        [41, "40/1"],
        [51, "50/1"],
        [67, "66/1"],
        [101, "100/1"]
    ];
function toFractional(num){
    var list = fractionalReference;
    num = (typeof num == "string") ? parseFloat(num) : num;
    if(num % 1 == 0){
        num=num-1;
        return num+"/1"
    };
    
    for(var i = 0 ; i<list.length; i++){
        if(num === list[i][0]){
            return list[i][1]
        }
    }
    return "DEC! "+num
}

function toDecimal(frac){
    var list = fractionalReference;
    for(var i = 0 ; i<list.length; i++){
        if(num === list[i][0]){
            return list[i][1]
        }
    }
}



