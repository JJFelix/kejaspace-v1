import React from 'react';
import './Footer.css'
import '../assets/react.svg'
import { Link } from 'react-router-dom';
function Footer() {
    const profileImage = 'image.png'//'/images/profile.jpeg'
    return (
        <footer>
            <div className="footer-content">
                <div className="footer-logo d-flex align-items-center">
                    <img src={profileImage} alt="Logo" />
                    <h5>Keja Space</h5>
                </div>
                <div className="footer-links">
                    <ul>
                        <li><Link to={'/'} className={'nav-link'}>About</Link></li>
                        <li><Link to={'/'} className={'nav-link'}>Contact Us</Link></li>
                        <li><Link to={'/'} className={'nav-link'}>Our Policy</Link></li>
                    </ul>
                </div>
                <div className="footer-social">
                    <Link to={'https://www.facebook.com/profile.php?id=61560936770337&mibextid=ZbWKwL'}><i className="fab fa-facebook"></i></Link>
                    <Link to={'https://twitter.com/KejaSpace'}><i className="fab fa-twitter"></i></Link>
                    <Link to={'https://instagram.com/KejaSpace'}><i className="fab fa-instagram"></i></Link>
                    <Link to={'https://www.tiktok.com/@kejaspacekenya?_t=8myfS3BaytJ&_r=1'}><i className="fab fa-tiktok"></i></Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
