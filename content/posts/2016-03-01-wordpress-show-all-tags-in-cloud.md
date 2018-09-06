---
title: WordPress – show all Tags in Cloud
author: Beej
type: post
date: 2016-03-02T00:50:33+00:00
year: "2016"
month: "2016/03"
url: /2016/03/wordpress-show-all-tags-in-cloud.html
dsq_thread_id:
  - 6304593094
tags:
  - WordPress

---
wordpress defaults to only showing the [first 45 tags][1]
  
tweak this file => \wp-includes\widgets\class-wp-widget-tag-cloud.php
  
add the "number=0" parameter to this code:

        /**
             * Filter the taxonomy used in the Tag Cloud widget.
             *
             * @since 2.8.0
             * @since 3.0.0 Added taxonomy drop-down.
             *
             * @see wp_tag_cloud()
             *
             * @param array $current_taxonomy The taxonomy to use in the tag cloud. Default 'tags'.
             */
            $tag_cloud = wp_tag_cloud( apply_filters( 'widget_tag_cloud_args', array(
                'taxonomy' => $current_taxonomy,
                'echo' => false,
          'number' => 0
            ) ) );
    

&nbsp;
  
now go consolidate all your single count tags dangling out there 🙂

 [1]: https://codex.wordpress.org/Function_Reference/wp_tag_cloud