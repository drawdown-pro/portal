import React from 'react';
import { colorForName } from 'grommet/utils';
import { hpe } from 'grommet/themes';
import { baseStyle } from 'grommet/utils/styles';

export function ContentPanel({children}) {
  return (
    <div className="ddp-content-panel">
      {children}
    </div>
  );
}

export function ContentThumbnail({image, size}) {
  var style = {
    backgroundImage: `url(${image})`,
    width: size,
    height: size
  };
  return (
    <div className="ddp-content-thumbnail" style={style}>
    </div>
  );
}

export function ContentHeader({children}) {
  return (
    <div className="ddp-content-header">
      {children}
    </div>
  );
}

export function ContentDetails({children}) {
  return (
    <div className="ddp-content-details">
      {children}
    </div>
  );
}

export function ContentFooter({children}) {
  return (
    <div className="ddp-content-footer">
      {children}
    </div>
  );
}

export function ContentBox({children, height, image}) {
  image = image || "/static/img/org.png";
  var style = {
    "height": height
  };
  return (
    <div className="ddp-content-box" style={style}>
      <ContentThumbnail image={image} size={height-4} />
      <ContentPanel>
        {children}
      </ContentPanel>
    </div>
  );
}