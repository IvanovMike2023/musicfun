import s from "./TracksList.module.css";
type Props= {
    pages: any
}
export const TracksList=({pages}:Props)=>{
  return   pages.map((el: any) => {
        const {title, user, attachments} = el.attributes
        return <div key={el.id} className={s.container}>
            <div className={s.item}>
                <div>{title}</div>
                <div>{user.name}</div>
            </div>
            <div>
                {attachments.length ? <audio controls src={attachments[0].url}/> : "no file"}
            </div>
        </div>
    })}
