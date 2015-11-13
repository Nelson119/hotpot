<?php /* Template Name: 聯絡我們 */ get_header(); ?>

	<main role="main">

  
      <article class="page contactus">
        <aside class="center">
          <?php if (have_posts()): while (have_posts()) : the_post(); ?>
          <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
            <?php the_content(); ?>
            <?php comments_template( '', true );?>
          </article>
          <?php endwhile; ?>
          <?php else: ?>
          <article>
            <h2><?php _e( 'Sorry, nothing to display.', 'html5blank' ); ?></h2>
          </article>
          <?php endif; ?>
          <form class="w960">
            <section class="row">
              <hr>
              <section class="form-group required">
                <section class="col-lg-2">
                  <label class="control-label" for="name">查詢類型</label>
                </section>
                <section class="col-lg-10">
                  <label class="radio-inline"><input type="radio" name="optradio">活動承辦</label>
                  <label class="radio-inline"><input type="radio" name="optradio">設備出租</label>
                  <label class="radio-inline"><input type="radio" name="optradio">代理業務</label>
                  <label class="radio-inline"><input type="radio" name="optradio">其他</label> 
                </section>

              </section>
              <hr>

              <section class="form-group required">
                <section class="col-lg-2">
                  <label class="control-label" for="name">姓名</label>
                </section>
                <section class="col-lg-10">
                  <input type="text" name="name" class="form-control" required placeholder="">
                </section>
              </section>
              <hr>
              
              <section class="form-group required">
                <section class="col-lg-2">
                  <label class="control-label" for="corp">公司名稱</label>
                </section>
                <section class="col-lg-10">
                  <input type="text" name="corp" class="form-control" required placeholder="">
                </section>
              </section>
              <hr>
              
              <section class="form-group required">
                <section class="col-lg-2">
                  <label class="control-label" for="phone">電話號碼</label>
                </section>
                <section class="col-lg-10">
                  <input type="text" name="phone" class="form-control" required placeholder="">
                </section>
              </section>
              <hr>
              
              <section class="form-group">
                <section class="col-lg-2">
                  <label class="control-label" for="fax">傳真號碼</label>
                </section>
                <section class="col-lg-10">
                  <input type="text" name="fax" class="form-control" placeholder="">
                </section>
              </section>
              <hr>

              <section class="form-group">
                <section class="col-lg-2">
                  <label class="control-label" for="addres">地址</label>
                </section>
                <section class="col-lg-10">
                  <input type="text" name="addres" class="form-control" placeholder="">
                </section>
              </section>
              <hr>

              <section class="form-group required">
                <section class="col-lg-2">
                  <label class="control-label" for="email">E-MAIL</label>
                </section>
                <section class="col-lg-10">
                  <input type="text" name="email" class="form-control" required placeholder="">
                </section>
              </section>
              <hr>

              <section class="form-group required text">
                <!-- <section class="row"> -->
                  <section class="col-lg-2">
                    <label class="control-label" for="message">詢問內容</label>
                  </section>
                  <section class="col-lg-10">
                    <textarea type="text" name="message" class="form-control" required placeholder=""></textarea>
                  </section>
                  <div class="clearfix"></div>
                <!-- </section> -->
              </section>
              
              <section class="form-group">
              <hr>
                <section class="col-lg-12 text-center hint">
                  上列欄位有※符號為必填項目，請確實填寫勿遺漏。
                </section>
                <section class="col-lg-12 text-center butt">
                  <button class="btn btn-default">發送訊息</button>
                </section>
              </section>
              
            </section>
          </form>
        </aside>

      </article>

	</main>

<?php get_sidebar(); ?>

<?php get_footer(); ?>
