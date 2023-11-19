---
date: 2023/11/7
description: comment test page
image: post-image.jpeg
prev:
  text: Configuring Locales
  link: /blog/change-locales
next:
  text: Frontmatter Config
  link: /blog/test
---

# comment test page

### 春江花月夜
春江潮水連海平，海上明月共潮生。
灩灩隨波千萬里，何處春江無月明！
江流宛轉遶芳甸，月照花林皆似霰。
空裏流霜不覺飛，汀上白沙看不見。
江天一色無纖塵，皎皎空中孤月輪。
江畔何人初見月？江畔何年初照人？
人生代代無窮已，江月年年祗相似。
不知江月待何人，但見長江送流水。
白雲一片去悠悠，青楓浦上不勝愁。
誰家今夜扁舟子？何處相思明月樓？
可憐樓上月徘徊，應照離人妝鏡台。
<!--more-->
玉戶簾中卷不去，擣衣砧上拂還來。
此時相望不相聞，願逐月華流照君。
鴻雁長飛光不度，魚龍潛躍水成文。
昨夜閑潭夢落花，可憐春半不還家。
江水流春去欲盡，江潭落月復西斜。
斜月沉沉藏海霧，碣石瀟湘無限路。
不知乘月幾人歸，落月搖情滿江樹。

## 长代码

```typescript
/**
 * Helper for image manipulation and image-related utility functions
 *
 */
import {
  BaseItemDto,
  BaseItemKind,
  BaseItemPerson,
  ImageType
} from '@jellyfin/sdk/lib/generated-client';
import { useRemote } from '@/composables';
import { getShapeFromItemType, isPerson, CardShapes } from '@/utils/items';

export interface ImageUrlInfo {
  url?: string;
  blurhash?: string;
}

const excludedBlurhashTypes = Object.freeze(
  new Set<ImageType>([ImageType.Logo])
);

/**
 * Gets the tag of the image of an specific item and type.
 *
 * @param item - The item object.
 * @param type - The type of the image requested.
 * @param [index=0] - Index of the Backdrop image (when ImageType equals to 'Backdrop').
 * @param [checkParent=true] - Looks for tag/image type for the parent if the passed item doesn't have the ImageType requested
 * @returns Returns the tag, undefined if the specific ImageType doesn't exist.
 */
export function getImageTag(
  item: BaseItemDto | BaseItemPerson,
  type: ImageType,
  index = 0,
  checkParent = true
): string | undefined {
  if (isPerson(item)) {
    return item.PrimaryImageTag && type === ImageType.Primary
      ? item.PrimaryImageTag
      : undefined;
  }

  if (item.ImageTags?.[type]) {
    return item.ImageTags?.[type];
  } else if (type === ImageType.Backdrop && item.BackdropImageTags?.[index]) {
    return item.BackdropImageTags[index];
  }

  if (checkParent) {
    switch (type) {
      case ImageType.Primary: {
        return (
          item.AlbumPrimaryImageTag ||
          item.ChannelPrimaryImageTag ||
          item.ParentPrimaryImageTag ||
          undefined
        );
      }
      case ImageType.Art: {
        return item.ParentArtImageTag ?? undefined;
      }
      case ImageType.Backdrop: {
        return item.ParentBackdropImageTags?.[index] ?? undefined;
      }
      case ImageType.Logo: {
        return item.ParentLogoImageTag ?? undefined;
      }
      case ImageType.Thumb: {
        return item.ParentThumbImageTag ?? undefined;
      }
    }
  }
}

/**
 * Gets the itemId of the parent element.
 *
 * @param item - The item object.
 * @returns Returns the parent itemId, undefined if it doesn't exist.
 */
export function getParentId(item: BaseItemDto): string | undefined {
  if (item.AlbumId) {
    return item.AlbumId;
  } else if (item.ChannelId) {
    return item.ChannelId;
  } else if (item.SeriesId) {
    return item.SeriesId;
  } else if (item.ParentArtItemId) {
    return item.ParentArtItemId;
  } else if (item.ParentPrimaryImageItemId) {
    return item.ParentPrimaryImageItemId;
  } else if (item.ParentThumbItemId) {
    return item.ParentThumbItemId;
  } else if (item.ParentBackdropItemId) {
    return item.ParentBackdropItemId;
  } else if (item.ParentLogoItemId) {
    return item.ParentLogoItemId;
  } else if (item.SeasonId) {
    return item.SeasonId;
  } else if (item.ParentId) {
    return item.ParentId;
  }
}

/**
 * Gets the blurhash string of an image given the item and the image type desired.
 *
 * @param item - The item object.
 * @param type - The type of the image requested.
 * @param [index=0] - Index of the Backdrop image (when ImageType equals to 'Backdrop').
 * @param [checkParent=true] - Checks for the parent's images blurhash (in case the provided item doesn't have it)
 * @returns Returns the tag, undefined if the specific ImageType doesn't exist.
 */
export function getBlurhash(
  item: BaseItemDto | BaseItemPerson,
  type: ImageType,
  index = 0,
  checkParent = true
): string | undefined {
  if (item) {
    const tag = getImageTag(item, type, index, checkParent);

    if (
      tag &&
      !excludedBlurhashTypes.has(type) &&
      item.ImageBlurHashes?.[type]?.[tag]
    ) {
      return item.ImageBlurHashes?.[type]?.[tag];
    }
  }
}

/**
 * Returns the aspect ratio that should be use
 */
export function getContainerAspectRatioForImageType(
  imageType?: ImageType
): number {
  if (imageType === ImageType.Backdrop) {
    return 1.777_777_778;
  }

  return 0.666_666_667;
}

/**
 * Gets the desired aspect ratio based on card shape
 * @param shape
 * @returns
 */
export function getDesiredAspect(shape: CardShapes): number {
  let aspectRatio;

  switch (shape) {
    case CardShapes.Portrait: {
      aspectRatio = 2 / 3;
      break;
    }
    case CardShapes.Thumb: {
      aspectRatio = 16 / 9;
      break;
    }
    case CardShapes.Banner: {
      aspectRatio = 1000 / 185;
      break;
    }
    default: {
      aspectRatio = 1;
      break;
    }
  }

  return aspectRatio;
}

/**
 * Generates the image information for a BaseItemDto or a BasePersonDto according to set priorities.
 *
 * @param item - Item to get image information for
 * @param [options] - Optional parameters for the function.
 * @param [options.shape] - Shape of the card or element, used to determine what kind of image to prefer
 * @param [options.preferThumb=false] - Prefer the Thumb images
 * @param [options.preferBanner=false] - Prefer the Banner images
 * @param [options.preferLogo=false] - Prefer the Logo images
 * @param [options.preferBackdrop=false] - Prefer the Backdrop images
 * @param [options.inheritThumb=false] - Inherit the thumb from parent items
 * @param [options.quality=90] - Sets the quality of the returned image
 * @param [options.width] - Sets the requested width of the image
 * @param [options.ratio=1] - Sets the device pixel ratio for the image, used for computing the real image size
 * @param [options.tag] - Sets a specific image tag to get, bypassing the automatic priorities.
 * @returns Information for the item, containing the full URL and blurhash.
 */
export function getImageInfo(){}
```

## python test

![](https://images.unsplash.com/photo-1542401886-65d6c61db217?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)

```py
#!/usr/bin/env python3
# coding: utf-8
import json
import logging
import math
from urllib import parse

from base_setting import *
from bs4 import BeautifulSoup as bs
from client import Client
from requests import exceptions

logger = logging.getLogger('zhihu-logger')


class WebParser:
    def __init__(self, url):
        self.client = Client()
        self._session = self.client.return_session()
        self.followed_urls = []
        self.url = url
        self.quote_url = 'https://www.zhihu.com/people/' + parse.quote(url[url.rfind('/') + 1:])
        self.person_dict = {
            'home_page': url,
            # '_id': url[url.rfind('/') + 1:],
            'id': url[url.rfind('/') + 1:],
            'agreed': 0,
            'gender': 'intersexuality',
            'username': '',
            'location': '',
            'business': '',
            'company': '',
            'position': '',
            'education': '',
            'major': '',
            'thanks': 0,
            'asked': 0,
            'answered': 0,
            'post': 0,
            'collect': 0,
            'public_edit': 0,
            'followed': 0,
            'follower': 0
        }

    def get_person_info(self):
        try:
            r = self._session.get(self.quote_url)
            if r.status_code == 200:
                try:
                    doc = bs(r.text, 'lxml')
                    self.followed_urls += [{'_id': self.url, 'overwrite': True}]
                    logger.info('get [%s] success.' % self.url)
                except Exception as e:
                    logger.error('get person home failed, caused by: ' + str(e))
                    return
            else:
                logger.warning('get [%s] failed, code: %s' % (self.url, r.status_code))
                self.followed_urls += [{'_id': self.url, 'overwrite': True}]
                return

            # 暂时被知乎限制的账号，页面内容为空
            if len(doc.find_all('div', class_='ProfileBan-wrapper')):
                return

            self.person_dict['agreed'] = int(doc.find('span', class_='zm-profile-header-user-agree').strong.text)

            # 如果赞同为0, 认为是没有价值的用户。
            if self.person_dict['agreed'] == 0:
                return
                # disable user level for now
                # self.person_dict['active_level'] = 'fake-user'
            else:
                if doc.find('span', class_='gender') is not None:
                    self.person_dict['gender'] = 'female' if \
                        'female' in str(doc.find('span', class_='gender').i) else \
                        'male'

                self.person_dict['username'] = doc.find('div', class_='title-section').span.text
                self.person_dict['location'] = doc.find('span', class_='location')['title'] \
                    if doc.find('span', class_='location') else ''
                self.person_dict['business'] = doc.find('span', class_='business')['title'] \
                    if doc.find('span', class_='business') else ''
                self.person_dict['company'] = doc.find('span', class_='company')['title'] \
                    if doc.find('span', class_='company') else ''
                self.person_dict['position'] = doc.find('span', class_='position')['title'] \
                    if doc.find('span', class_='position') else ''
                self.person_dict['education'] = doc.find('span', class_='education')['title'] \
                    if doc.find('span', class_='education') else ''
                self.person_dict['major'] = doc.find('span', class_='major')['title'] \
                    if doc.find('span', class_='major') else ''

                self.person_dict['thanks'] = int(doc.find('span', class_='zm-profile-header-user-thanks').strong.text)
                items = doc.find_all('a', class_='item')
                for i in items:
                    # 定义一个函数, 把i.href传进去更好看一点
                    if i['href'].endswith('/asks'):
                        self.person_dict['asked'] = int(i.span.text)
                    elif i['href'].endswith('/answers'):
                        self.person_dict['answered'] = int(i.span.text)
                    elif i['href'].endswith('/posts'):
                        self.person_dict['post'] = int(i.span.text)
                    elif i['href'].endswith('/collections'):
                        self.person_dict['collect'] = int(i.span.text)
                    elif i['href'].endswith('/logs'):
                        self.person_dict['public-edit'] = int(i.span.text)
                    elif i['href'].endswith('/followees'):
                        self.person_dict['followed'] = int(i.strong.text)
                    elif i['href'].endswith('/followers'):
                        self.person_dict['follower'] = int(i.strong.text)

        except exceptions.ConnectionError as e:
            logger.error(str(e))

```

这里是正文