with open('data/pageHtml.ts', 'r', encoding='utf-8') as f:
    for line in f:
        if line.startswith('export const HTML_HOME'):
            import re
            videos = re.findall(r'<video[^>]*>.*?</video>', line)
            print("Videos in HTML_HOME:", len(videos))
            for v in videos:
                print("  Video:", v[:300])
            clips = re.findall(r'<[^>]*class="[^"]*tp-clip[^"]*"[^>]*>', line)
            print("Clips in HTML_HOME:", len(clips))
            for c in clips:
                print("  Clip:", c)
