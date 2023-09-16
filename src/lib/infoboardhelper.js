
import  _ from 'lodash';

/**
 * 
 * @param Array({*}) infoboard 
 * @returns Array
 */
export function parseInfoboard(infoboard) {
    let index=0;
    return infoboard.map( arr => {
        let fachbereiche = [];
        let dateTime = [];
        let dateParts = [];
        let period = [];
        let ortRaum = [];
        let date = []
        
        if( ! _.isUndefined(arr[8]) && arr[8] != '' ) {
          fachbereiche = arr[8].split("#")
        }
        if( ! _.isUndefined(arr[1]) && arr[1] != '' ) {
          dateTime = arr[1].split(" ")
        }
        dateParts = dateTime[0].split(".");

        if( ! _.isUndefined(arr[3]) && arr[3] != '' ) {
          period = arr[3].split(" - ");
        }
        if(arr[9] == arr[4]){
          ortRaum = arr[9]
        }else{
          ortRaum = arr[9] + arr[4]
        }
        date = dateParts[2] + "." + dateParts[1] + "." + dateParts[0]; 
        return {
        'uuid' : 'infoboard-'+(index++),
        'date': date,
        'timeStart': period[0],
        'timeEnd': period[1],
        'fachbereiche': fachbereiche,
        'ortRaum': ortRaum,
        'prof': arr[6],
        'info': arr[7],
        'title': arr[5],
        'class': "infoBoard",
        'type': "course"
        }
    } )
}