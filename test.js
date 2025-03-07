function flatten2DArray(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] instanceof Array) {
            let flatResult = flatten2DArray(arr[i]);  // เรียกฟังก์ชันตัวเอง
            for (let j = 0; j < flatResult.length; j++) {
                result.push(flatResult[j]);  // เพิ่มค่าทีละตัว
            }
        } else {
            result.push(arr[i]);
        }
    }
    return result;
}

function bubbleSort(arr) {
    let n = arr.length;
    // Bubble sort algorithm
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap elements if they are in the wrong order
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr
}

function sort2DArrayTo1D(arr) {
    // 1. Flatten อาร์เรย์ 2 มิติเป็นอาร์เรย์ 1 มิติ
    let flattened = flatten2DArray(arr);

    console.log(flattened)
    // 2. เรียงลำดับอาร์เรย์ 1 มิติด้วย Bubble Sort
    console.log("SORT : ",bubbleSort(flattened))
    // // 3. Return อาร์เรย์ที่ถูกเรียง
    // return flattened;
}

let arr2D = [
    [
        [5, 3, 8],
        [8, 3, 2],
        [
            [2, 3, 1],
            [2, 1, 2]
        ]
    ],
    [12, 7, 1],
    [9, 4, 6]
];

console.log(sort2DArrayTo1D(arr2D)); 