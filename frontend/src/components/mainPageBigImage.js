export default function MainPageBigImage({ description, projectName, imageUrl }) {
    const containerStyle = {
        height: '90vh',
        width: 'auto',
        position: 'relative',
      };
    
      const backgroundStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(2px)', // add a 2px blur effect to the background
        WebkitBackdropFilter: 'blur(2px)', // add a 2px blur effect to the background for Safari
        zIndex: -1, // set a negative z-index to position the background behind the content
      };
    
      const overlayStyle = {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // add a black overlay with 50% opacity
        zIndex: -1, // set a negative z-index to position the overlay behind the content
      };
    
      const textStyle = {
        color: 'white',
        textAlign: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1,
        width: 'auto',
      };

    
      return (
        <div style={containerStyle}>
            <div style={backgroundStyle} />
            <div style={overlayStyle} />
            <div style={textStyle}>
                <h2>{projectName}</h2>
                {description}
            </div>
        </div>
      );
}