import React        from 'react';
import styles       from './FooterStyle.module.sass'
import Icon         from "@mdi/react";
import { mdiPhone } from "@mdi/js";

function Footer( props ) {
    return (
        <div className={styles.footerContainer}>
            <div className={styles.contacts}>
                <span><Icon path={mdiPhone} color="white" size={0.8}/></span>
                <span>+380614441022</span>
                <span>+380954333011</span>
            </div>
            <div className={styles.year}>
                © 2021 buttechno.net.ua
            </div>

        </div>
    );
}

export default Footer;