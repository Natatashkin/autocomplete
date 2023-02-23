import DefaultAvatar from "../../images/icons/DefaultAvatar";
import styles from "./ClientCard.module.scss";

const ClientCard = ({ name, surname, phone, url, onClick }) => {
  return (
    <div className={styles.clientCard} onClick={onClick}>
      <div className={styles.avatar}>
        <DefaultAvatar avatarUrl={url} />
      </div>
      <div className={styles.info}>
        <p className={styles.name}>{name}</p>
        <p className={styles.surname}>{surname}</p>
        <p className={styles.phone}>{phone}</p>
      </div>
    </div>
  );
};

export default ClientCard;
