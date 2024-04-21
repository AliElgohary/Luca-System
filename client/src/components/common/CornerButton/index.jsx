import { BiPlus } from 'react-icons/bi';
import styles from './CornerButton.module.css'

const ConrnerButton = ({onClick}) => {
    return ( 
        <button onClick={onClick} className={styles.btn}>
            <BiPlus color='#ffff' size={30}/>
        </button>
     );
}
 
export default ConrnerButton;