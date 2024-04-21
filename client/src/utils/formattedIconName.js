
export const formatIconName = (iconName) => {
 
if(iconName.toLowerCase().includes("outline"))
 return removeKeyWord(iconName , "outline")

 if(iconName.toLowerCase().includes("fill"))
 return removeKeyWord(iconName , "fill")


 if(iconName.toLowerCase().includes("twotone"))
 return removeKeyWord(iconName , "twotone")



 return removeKeyWord(iconName , null)
}


const removeKeyWord = (word , keyWord) => {
    let newWord = word.slice(2)
    if(! keyWord){
        // no match keyword
        return pascalCaseToWords(newWord)
    }
    const index = newWord.toLowerCase().lastIndexOf(keyWord) + keyWord.length ;
    return pascalCaseToWords(newWord.slice(index))
}

function pascalCaseToWords(str) {
    return str.replace(/([A-Z])/g, ' $1').trim();
}