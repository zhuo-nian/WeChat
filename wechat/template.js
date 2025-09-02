module.exports = options => {
    let replyMessage = `<xml>
        <ToUserName><![CDATA[${options.fromUserName}]]></ToUserName>
        <FromUserName><![CDATA[${options.toUserName}]]></FromUserName>
        <CreateTime>${options.createTime}</CreateTime>
        <MsgType><![CDATA[${options.msgType}]]></MsgType>`;
    if (options && options.msgType === 'text') {
        replyMessage += `<Content><![CDATA[${options.content}]]></Content>`;
    } else if (options && options.msgType === 'image') {
        replyMessage += `<Image>
            <MediaId><![CDATA[${options.mediaId}]]></MediaId>
        </Image>`;
    } else if (options && options.msgType === 'voice') {
        replyMessage += `<Voice>
            <MediaId><![CDATA[${options.mediaId}]]></MediaId>
        </Voice>`;
    } else if (options && options.msgType === 'video') {
        replyMessage += `<Video>
            <MediaId><![CDATA[${options.mediaId}]]></MediaId>
            <Title><![CDATA[${options.title}]]></Title>
            <Description><![CDATA[${options.description}]]></Description>
        </Video>`;
    } else if (options && options.msgType === 'music') {
        replyMessage += `<Music>
            <Title><![CDATA[${options.title}]]></Title>
            <Description><![CDATA[${options.description}]]></Description>
            <MusicUrl><![CDATA[${options.musicUrl}]]></MusicUrl>
            <HQMusicUrl><![CDATA[${options.hqMusicUrl}]]></HQMusicUrl>
            <ThumbMediaId><![CDATA[${options.thumbMediaId}]]></ThumbMediaId>
        </Music>`;
    } else if (options && options.msgType === 'news') {
        replyMessage += `<ArticleCount>${options.articles.length}</ArticleCount>
        <Articles>`;
        options.articles.forEach(item => {
            replyMessage += `<item>
                <Title><![CDATA[${item.title}]]></Title>
                <Description><![CDATA[${item.description}]]></Description>
                <PicUrl><![CDATA[${item.picUrl}]]></PicUrl>
                <Url><![CDATA[${item.url}]]></Url>
            </item>`;
        })
        replyMessage += `</Articles>`;
    }
    replyMessage += `</xml>`;
    return replyMessage;
}