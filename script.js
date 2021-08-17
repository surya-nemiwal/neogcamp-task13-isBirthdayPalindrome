var dateTag = document.getElementById('dateInput');
var button = document.getElementById('button');
var resultTag = document.getElementById('result');

// var year2Digit = "";
// var year4Digit = "";
// var month = "";
// var day = "";

function getAllCombinationsOfDate(day,month,year4Digit) {
    // [year4Digit, month, day] = dateTag.value.split("-");
    // console.log("type of year4Digit is",typeof year4Digit)
    year2Digit = year4Digit.slice(2, 4);
    // console.log(day, month, year4Digit, year2Digit);
    let combinations = []
    combinations.push(day + month + year4Digit);
    combinations.push(day + month + year2Digit);
    combinations.push(month + day + year4Digit);
    combinations.push(month + day + year2Digit);
    combinations.push(year4Digit + month + day);
    combinations.push(year2Digit + month + day);
    return combinations;
    localeCompare()
}


function isPalindrome(date) {
    let reversedDate = date.split("").reverse().join("");
    // console.log('reversedDate = ' + reversedDate);
    // console.log(reversedDate.localeCompare(date));
    return reversedDate.localeCompare(date) === 0;
    // if(reversedDate.localeCompare(date) === 0){

    //    return true;
    // }
    // return false;
}


function isDatePalindrome(day,month,year) {
    // console.log("pdin",day,month,year);
    let combinations = getAllCombinationsOfDate(day,month,year);
    // console.log(combinations);
    flag = false;
    for (let i = 0; i < combinations.length; i++) {
        let date = combinations[i];
        if (isPalindrome(date)) {
            // console.log('birthday is palindrome');
            flag = true;
            break;
        }
    }
    return flag
}

var daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
function isLeapYear(year){
    if((year%4==0 && year%100 != 0 ) || year%400==0)
        return true
    return false
}

function findPreviousDate(day, month, year) {
    if (day == 1) {
        if (month == 1) {
            month = 12;
            day = 31;
            year -= 1;
            return [day, month, year]
        } else {
            month -= 1;
            if (month == 2 && isLeapYear(year)) {
                return [daysInMonth[month] + 1, month, year]
            }
            return [daysInMonth[month], month, year]
        }
    } else return [day - 1, month, year]

}
function findNextDate(day, month, year){
    if(day < 28){
        return [day+1, month, year]
    }
    if(month == 2){
        if((isLeapYear(year) && day==29) || (!isLeapYear(year) && day == 28)){
            day = 1;
            month = 3;
            return [day, month, year]
        }
        return [day+1, month, year]
    }
    if(day == daysInMonth[month]){
        if(month == 12){
            day = 1;
            month = 1;
            year += 1;
            return [day, month, year]
        }else{
            return [1, month+1, year]
        }
    }
    return [day+1, month, year]

}
function findNearestPalindromeInPast(day,month,year) {
    // console.log("pd",day,month,year);
    [preDay, preMonth, preYear] = findPreviousDate(day, month,year);
    [nxtDay,nxtMonth,nxtYear] = findNextDate(day,month,year);
    // console.log("pd",preDay,preMonth,preYear);
    count = 1
    inPast = false;
    while (count < 300) {
        // console.log("pd",preDay,preMonth,preYear);
        preDayString = preDay < 10?'0'+preDay.toString(): preDay.toString();
        monthString = preMonth < 10?'0'+preMonth.toString(): preMonth.toString();
        preYearString = preYear.toString();
        // console.log(preDayString,monthString,preYearString);
        if(isDatePalindrome(preDayString,monthString,preYearString)){
            inPast = true;
            break
        }
        
        nxtDayString = nxtDay < 10?'0'+nxtDay.toString(): nxtDay.toString();
        monthString = nxtMonth < 10?'0'+nxtMonth.toString(): nxtMonth.toString();
        nxtYearString = nxtYear.toString();
        // console.log(nxtDayString,monthString,nxtYearString);
        if(isDatePalindrome(nxtDayString,monthString,nxtYearString)){
            break;
        }

        [preDay, preMonth, preYear] = findPreviousDate(preDay, preMonth,preYear);

        [nxtDay, nxtMonth, nxtYear] = findNextDate(nxtDay, nxtMonth,nxtYear);

        count += 1
    }
    let date = inPast? `${preDay}-${preMonth}-${preYear}`:`${nxtDay}-${nxtMonth}-${nxtYear}`;
    return [count,inPast,date];
    // for (let i = 0; i < 10; i++) {
    //     newYear -= i;
    //     while (newMonth > 0) {
    //         while (newDay > 0) {

    //         }
    //         totalDays = findTotalDays();

    //     }

    // }

}

function handleClick() {
    if (dateTag.value.length == 0) {
        resultTag.innerHTML = " Please select a date <span>😟</span> ";
        return
    }
    let date = dateTag.value.split("-");
    if (isDatePalindrome(date[2],date[1],date[0])) {
        resultTag.innerHTML = " hurray! your birthday is Palindrome <span>🥳🥳<span>"
    } else {
        let [count,inPast,palindromeDate] = findNearestPalindromeInPast(parseInt(date[2]),parseInt(date[1]),parseInt(date[0]));
        // if(inPast){
            resultTag.innerHTML = `Opps! your birthday is not Palindrome <span>🙁🙁</span>.<br>
             You missed a palindromic birthday by <strong>${count} days</strong> in <strong>${inPast?'past':'future'}</strong> i.e on <strong>${palindromeDate}</strong> `
        // }else{
        //     resultTag.innerHTML = ` Opps! your birthday is not Palindrome <span>🙁🙁<span>. A palindromic birthday is ${count} days f`
        // }
        
    }
}

button.addEventListener("click", handleClick);