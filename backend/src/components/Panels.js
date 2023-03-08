import styles from '@/styles/Panels.module.scss'

export const Panels = props => {
  return <div className={styles.Panels}>{props.children}</div>
}
