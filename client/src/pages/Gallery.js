import  React  from 'react';
import Header from '../component/header';
import SidebarTabs from '../component/sideBar';
import '../styles/gallery.css';

const Gallery = () => {
    return (
        <>
            <Header />
            <SidebarTabs />
            <div className="gallery-box">
                <h1>Thư viện ảnh</h1>
                <p>Chức năng này sẽ hiển thị tất cả các ảnh của bạn trong tương lai.</p>
            </div>
        </>
    );
};

export default Gallery;
