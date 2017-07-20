import NewGallery from './create-gallery-component';
import ListGallery from './list-gallery-component';

const Gallery = (props) => {
  return (
    <div className="container-fluid">
      <div>
        <NewGallery />
      </div>
      <ListGallery />
    </div>
  );
};

export default Gallery;
