import fetch from 'node-fetch';

(async () => {
  const getUrl = (moment) => {
    const ownerName = moment.ownerV2.username;
    const momentId = moment.id;
    const url = `https://nbatopshot.com/moment/${ownerName}+${momentId}`;
    return url;
  };
  const getData = async (
    targetSerial,
    rightCursor = 'CiYKJDg2ZGE3ZGYwLTk1NTctNDA4MC04YjMyLWFhMWNkMzBkNzgyZRACKgwKAghIEgQIwLgCGAI=',
    { retry } = {},
  ) => {
    const resp = await fetch(
      'https://nbatopshot.com/marketplace/graphql?SearchMintedMomentsForSerialNumberModal',
      {
        headers: {
          accept: '*/*',
          'accept-language': 'en-US,en;q=0.9',
          'content-type': 'application/json',
          'sec-ch-ua':
            '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'vunddwwmmk-a':
            'eTSWJ2mlqHYyirGZlicS6BR8aCIbHS5fx4uziUaitTPT4T5YKxGVYB-1PtOzlY94Hq_Bs6oe52coy_d628eg=xtkYy7OHGL5j6UugvfBxv_BUzrB45bjU8DOCAHkJ7ryM1j1-O288NKWW6fIqH81KTQJ9fQbbRC3=9f2_QkiHy31h1mqJIEQ=mqKfQ0GqShrs2gfIjus1Cx7gbzgrIFZHHBbjj33GANRqicqjaxjrUe9E85vj4crAehMiCDR0aWpB1EIS8ujgxQpc0QcAOjuHB6JMi9-BF_MHJ1FIu0XQXFZVjZzpi7I-2qNoBy-HbiZ87ShAvMlkSxL9_pC4cNlD3h39GGv1og85ef-QuW_pf=ubYSPkEBiZeUT7xhsKdGY_PXZ4fLX7TRts_WvpFgZNju4lAgPKMsg7OT3TVCVujaq8EtKG=5Hj5FzTpCajaFZS5AVZesTcyn=zasP_S0UeWrpIToiA_Lt2Ze46_2o84Sagqx9RzTYtDdpBStU9vamVWDhhWLiAVRWy38GLby-RrO8Ab4ASo77Rt=KF5c4ry8K1=mqIFMnZt=BmcFnXpO_W_SIA5=gOXK_E2DRnkI0JzQ3BGPmW2pQN96dEVGQ3AlzMm0Z52WQAmM92U7J=CI5o1VDVWUyq=L2KuMg6deO=Cq0FKFlGY-MzP20ZJOsOa0=RGKlafzxJfA00vKF4c3upPcq8rj5p4MX_I5kRUZI2ZpPfkFN3HyQN7R1QZkpyf7PCYi_zIlpeFP2ugUfXK3-VCoTlgBBmnzOpIOCV7gFn9UZ=gsazYRY7OU7=jWImEofs3uAL1--ImetH5UQ4mQuiXkRc8Zo2eyU3TzsKS_Znc=ARj_vriBtCjthmBpigMg5P=26F6JMrQsXeNUZos1SuazYkWbxjmbJ980Wu=6uyxRVKCW8bK1hYnTvK=74p=XaV64CG_8hT8FTx0EicT390oAPZNdZttXv=ALeu2VtgPsk=0Nparan-DecMKs41b-qmQtSWckk2SEZ9YQDKdvyhVQKDOBOGs6NublZnqhDOaLFfjrQT6Yk9M18ygqeD3Tqt38IE5NbHcTgKdavKVBkEI=B0km474fBSx41VufzlF_3L=PmMXrPoqI=7uxXCF9ZoCEZ413=YLZdg28IH99z3nkcNOT0hTVNWrpGJIdpX54DfXnKRppLjfczZUfdsfz7uF25P3jDGY-yPoPAxJXrjircV8h88GzJPsgT=7-4x7PaGXAJTZlG_4k2QAtVBsy-rOhzapJRc4NUUbato4Q6oy=v_aZDT_CDLfnAK1eU4NGr1sGcsYR5MZRJrMV0rTbpaDEMFRU6Pec2CV=5BWrITsN2nj8m3pH6E_XMshxx=Kpr8kVaUEFvNa0dSbg8xJJ-duOHIn7M0eB_8e9VXT9raiafScVBHi4rhupUNKPMddRb1D7HHruI6kT01mi3lNI_FiBW-nyWbYEjXOnySyxf-kmnyPyRvO56tIP9WqfMY3sKjqRhIDIt1HMhKxiFUhRKVRShjKFaIrIF=ble35tBcMUjmMKqbjeGc-J35u6xlgH8G9G1SRnaR=OLE6RXqHgmDxLQxiz8tp1gxdmqaWXKBRLrfzgEog4=Q3V_rUqnt7R6-4X4PKzFAIi25uj9Ny1ST8i7tk_AfsY4bBqhRdlIeMvMB3AByq4uYOAjOy_TEkF5KaQG1V=JMN6DV6tmOg44XD0R-ZnJOuc8LHzMZcACYZzynmJz3Gf_3Y6aYk6AxlJM49mZ4UxhLGu4n=GrLSLXkj-2qP2UMpsFpb6kAcp5=GvGqXOHecyJVeTjKC-28loZsRv5Gy52FkEEDWMGv8LZG8O3juAs0x9mEHeVnN4W2GANWsmmMQM3bQC-hknkShNHqaAuSDNjPI3fGP3RJ1-vHyXQcmy-coB168C6-G23KjdQ-qgt-5q1GdXIYRkFr7moYDx-irV33qC5Qj0pNLj_mnokHXJVknVbG48c9AJm_Iekn1v0vPS=-yPKcod61FTPpdRpIQIqNIf4e2vpQzlD0QW6zcNQPkLWvY27-9UGZbaNTNsGZKLtmVgRAW_fd8TYLco6dgfxzpgIjW_eG75IyDc6dQIjG_pKpqgP-pSZKdWyjl_G6CKUpdZS8K4dodGHhgpLTCVI7AZpXEvTDZkiV2CUByLfXM_0zSm2ETBjcpHTilNf1782MBAWEqNT4iz=obrVxIurzD7UJCgyphMgK=838=2P98LTLDGftSb09RsRXA4YzSpbmPt0EgCg6i=xij7z3kXZBrJTCX4a5fLc9=o2n_oBH4b_lGmUzxtuhr1zLdyhNGsVK_iPX61nGC8rht8hFA_sJUK6aaMitvMJeE9b7zEhKle1oSRSOcWRWr-IMr_0roe_ljibfRqkk_HmxE6D=CYFh0hjmZoqya_-EXURu5Xm9T3APQ4K=2yHWbCedyb5u4Gh_MOt5dx-e4ceaoJyIT1quvXFKa-IRIJuiI5FehcUOKOpTgFqNLYJ77u340NZstdrrAHAgy1NaA6y1vH_8dpQtbtLFq4d1EfzLXEhsflYaz81X7cTY_ZMWC8Khh=O5qthyW78D7If29F1fskP4oNrrEjtp8mDk7ZQYRCns05GepunqOENBx39IkW9M9HcNjQDF3QlM0LxfnfzjsBOzmVP7Rjnfdr6atuvxKkmbfPlrhK_-UW3R3-NqdLh6Yk-4JDp=2XxVMS2nFeMuM2fY_3ieb3kSJsjVaeGfigy=HrUst9Iq746gKZggo8fVEna9rhEjrJE64iSEY90vNDJeiU1ssV6ecLMYnc1OQorYErZks13QMbIJ7Reh4inZk=QX-x238oD2=1F2UtyuGOH6ccvOhIdz6ncStNYC0bMXXin5M7QIThOFxbIBGH=HLSm7GFgMyb1t2Mh_torY1_FLOkhbcfPVJLXZPmpg4Ql2XTS7WuAs3WXCZLduJg-IUv71NNu4QzNt_ENj4c-2VsuJLW-81cCui=_D9h_kR6M8jMPtTa5yuO0kBXABHqZbZA8d8X-AB2Xe9ydC52JNR3ep-TiCClbuMDWfGIMP0H3Oq58ZDKbI_l=E_XjzuPlYmYnnENbGsl9AGhyEkGJFL2c8PDOGFKPjZFQDYXki3XrzTHh=5H0_CN5h18Xq5coXWnnMaTRtBr=TNou0-uRcOh_iheBUWh_tb45KTiHSmXTALAIeXb5xHL8-D1jc-jyJx=keWZ3Y5np99GLR6XWDtF0tnb6vORgmW8eeH_7eXMu5dN95Jz4hqqHv3poY40tl-OelRbK_QMa1KHNevPiOVsWvb=MaxXSSiGFuG7IOXkLFGxZyVBfAFphofN3ngui_xS_EbvHVuF3mPG6vGIOv-RjoDDXQmGVPALLBKcI7cYHPVtCOJ0YbEcyy2gLIb6iR=cDVYclL2mr99gvTay_854rvat1F8x4F0DkrdkdMpDRAIS9FUUexhI6amGeB7N8B8R0qZRdal2Jzfzv4uugPJi9Y7MVc69Jig2-m9EtEA7GK0Jm=4ag0zJRthkglKmcKdBr5kQD7CJRk3d_NruHG7TPfUs-KJNuH2lD4jLtzLOPBH=76Ms36W_6fAD0iB0ggII08gISzssiVTgFZtiuU8Qn1CgnvA1=IppRovG671MLZqWEKYOe0gTF-X0__rr=RmOGukQv4pheiYt5=qvWseqBOiJbF6mCq7nn70Pdm0Fyl7c9P-k3ESzp8CX9AG8yJPlq1XTne3PdbZX1X5IW_DKv5TPWHDdS1eRcMP7RF=jjKCn2TdaMOIIrRhghNd9PVbs_vLWcpmU=QJJ_7uOfbS3vPRgeo53UDH=kGGtWvhxrmbAFTkpTNL-gjVdGC2tyhGuy65cstJXA4H1_-heNjhiKixTF9tx_KZsRJsmmttnBL40VzgvOQF-Pb2bIaSQ8POJ2l9eI0T-B0Tl98UmUanAgXpUVZsxPJ-tz5AXf5eqWlK=gmncUSvheZOnkpdG2ApuIlf4upHH4iFJnBl5k6dVx2o06d8EIkKJunSe9UvcNkqHZJ3Za2-p0o68z8a1jDh-dD6RrHF9uKyucg9uXgJl1pkTPCglYBYgDPaf2NY=rE324LvSHAaeYF2r8ydUp79W4uUHgWruGJUildz=ibZhAkFVnyNniDjc=9QC2D8C_GKVIcHj4B0tmkRnN7O4=L3REY3kPVD7S6qWSO1=vGTtMR0iDLoIjVmCGREGpDXqt8fr8XOvNunrbl7r7=kQO-o1opTBTZVfLLaDQ7PrJa6Lne-QIiPhEyvsFr7igjEvZ7ColzMfR95D5Fyjb0BMOf0BIdB88GltVsrrPWq7EPkRcbxb5TicclX=vns0VoXx1Z8dn_0lWDOBzMCd-jkQdO-sm5AEqi723XlC=W8tX4KrZgla9tQgjm5VeXnkI3gCYRiLaR_iSx_x4lcld4q1AisRTrGg-efEgtN5CFYalViNieCKc2sPooxahKYvdopJYRXyjfokuUYmITLyKj6ikENcKIkyutbuvKP3dR4=K8WBU3ae_DAQkth70huh9AJ24LVd9JSKY2Ck0bSSNRZ=NjnZU4QVQEeneg=DxEysxD33h35tPV13iORB3DfporQasvHy_ulq8vg841mGd4VDHft_yUEjDMCp09YFe=x3xlixLCWbEph8-3zk0LYQ7gDGzILEul5bX7Xt-OqmqdYVKF0myujm4666_1xXQ5JaQlbU0bnX29IIHtjIlOHB6QLUq5-O1oJ6ml=0AHp5m6Z03Zu=HugAopy4SISF8ER5qKEePBA32Nv558aS2rZq0AHUIG1ohdpYpWUzKcnChWDPF0vYzFiGRz-6tIc1a374SvdOEnXHO33IKt6vztpRY3O8S24Y=6s0A51X-HS16=0N8yZE4q06USrSX3BhZTyVdNm6UB8_K371vumuJyrdma18jLU85yZqikttebr=bjr7xSV4LuoNNLN8eM4NQTEofQsSvrpbKbpaNEJrAPHMhSz=JO2TxUvFAYjjtfC4qbudg=t5nPAToH58YQody=meUMHDSGgs_Ca1P4s=IyviH25HeUfj_nPrqZGJiOak4BbGvJtUQctzhK6a4bkJy6yNn1ROlTl4JQdo7CA7KOF1jSCTOF8Mhyh4yRC3p-rDh7LOANveo6oPy2=y8n6me9TWnOF0bh0pIz7gXRy3fB-WXjj3M=rOnVuDMrUifT7LQV39F1nV9hmgiiWMnYWPrAb4gC_49vZySJ6EhUfmE0KPzLpUcyDmjB0Z8jCqtMK0TxUt9ibIX6hEo8kNSNK4snnz9_L5urlj03zAnRPqdzWv=TCpojnfMWZnaiAe2EkNMVeGlfWc24zUEHbNmvWX-g2A7C2=DNB4gvD1QTMhMTUpRkesVpCk_DrrM3Yc=696sm0PkR1iFnGkmRsLALM7sVFq8xkqf2QWZtpNhbEXZtlFSd1YIIl7V4-hGnGegN6ZZ=hrlGJtP-qnyGO55cGqBKWNRReSHWLh67LBgBXiZmEZMgRvNajGjvqqBQAN6MBL9Hz3oxGVN4mzrSTdtWJyL4ZHFvarpI2RUxgtBI-65PQTu5Y9YQICrDNG3cgEr23oee6csngbZ76JIvN7_qWd-x7c8ui',
          'vunddwwmmk-b': 'vfasfg',
          'vunddwwmmk-c':
            'AED3Q5iBAQAAIkdrERsK_MMl8q6kFEyDvdk4_u4CHIEQqDpcWnBmY-5axKyY',
          'vunddwwmmk-d':
            'ABaChIjBDKGNgUGAQZIQhISi0eIApJmBDgBwZmPuWsSsmAAAAABzL1n6AHTX2Z_SDe2pXZtOkKlVILg',
          'vunddwwmmk-f':
            'A8tcXZiBAQAAwFzVQRMQ1RmVxLlotXYxOwUyHyPmUvBIJ7Cf_a3h_4JGFWbJAK5yRAHAfwAA5-8AAAAA',
          'vunddwwmmk-z': 'q',
          'x-id-token':
            'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik9EQkVPRGxDUXpWR1JVUXhSRUl5UkRRNE1rVTJNekkzTlVaR1JUWkNPRFJCUkRZNU9URXhOUSJ9.eyJodHRwczovL2FjY291bnRzLm1lZXRkYXBwZXIuY29tL2lkZW50aXR5X3ZlcmlmaWVkIjp0cnVlLCJodHRwczovL2FjY291bnRzLm1lZXRkYXBwZXIuY29tL2Zsb3dfYWNjb3VudF9pZCI6IjFjZGYwNTNjMzkxMjgzMjUiLCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtdXNlci1pZCI6Imdvb2dsZS1vYXV0aDJ8MTAyNDgwNTQzMTA0ODkzMDU4MTc3In0sImdpdmVuX25hbWUiOiJKdXN0aW4iLCJmYW1pbHlfbmFtZSI6IldhbHRlcnMiLCJuaWNrbmFtZSI6ImF4bWlsbGlhIiwicHJlZmVycmVkX3VzZXJuYW1lIjoibm9ybWFsX3Nwcm91dHMzMzAzIiwibmFtZSI6Ikp1c3RpbiBXYWx0ZXJzIiwicGljdHVyZSI6Imh0dHBzOi8vc3RvcmFnZS5nb29nbGVhcGlzLmNvbS9kYXBwZXItcHJvZmlsZS1pY29ucy9hdmF0YXItZGVmYXVsdC5wbmciLCJsb2NhbGUiOiJlbiIsInVwZGF0ZWRfYXQiOiIyMDIyLTA2LTI0VDAxOjE4OjEwLjM3OFoiLCJlbWFpbCI6ImF4bWlsbGlhQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL2F1dGgubWVldGRhcHBlci5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDI0ODA1NDMxMDQ4OTMwNTgxNzciLCJhdWQiOiI3NTZLQ3ZpaXU2VkFTMW5iZXRqVWprNjRPY1owWXY4ciIsImlhdCI6MTY1NjExODUwNSwiZXhwIjoxNjU2MTIwMzA1fQ.wFKVdHesvOyyu_1zEM2njjiLDViIP7neB0L9BdCf1e1GzEaH8dnUnp2ETAOV2yYkeeb2O_gb8BCVTTkVSdLEn2lEuihDOsqXqwOkQ4G38aovBExZO1LfIfF8NTUg_7qdoVjeGCFcIHCIOgjTU8P2bgxzvhlWotfoeVWEycIcxl1d2_o843MUIxZ148IDoK40sIl0MnDnTNDJlGXjChJMC-87gRMqho656-p-VapprJY8RV9NAJlB8m_vHbjZdRoAmiV0iD7wmkxPjn3_H72l05C5wdhZ_NNIWkPeyfFDQEbLtxoaHwHM6vm0Qqr6nv05vBdgQ1oi9EMAkVsFRNjVpw',
          cookie:
            'UIrkFSI9=A1tbDTWAAQAAu9uj6Qzrvuw9F8zt5-38vav4Xx_PGnQ9ghuK4XBpBnCGi-GRAaJT_9aucpl_wH8AAOfvAAAAAA|1|1|3129eea63bd6fa37bb5bdd3886a8ee9d6a98fef5; __ssid=986eb0bfa8957461cc27371565f0854; _gcl_au=1.1.1112949019.1650331344; _rdt_uuid=1650331344256.e85ef55b-6bb8-4f61-9f9c-8ea4c2c43eca; _tt_enable_cookie=1; _ttp=f2b26a9e-fb1b-4667-b98a-bfcc2d6f4f4d; tracking-preferences={%22version%22:1%2C%22destinations%22:{%22Customer.io%22:true%2C%22Google%20Analytics%22:true%2C%22Google%20Tag%20Manager%22:true%2C%22Hotjar%22:true%2C%22Mixpanel%22:true}%2C%22custom%22:{%22advertising%22:true%2C%22marketingAndAnalytics%22:true%2C%22functional%22:true}}; ajs_user_id=%22google-oauth2%7C102480543104893058177%22; ajs_anonymous_id=%22f95a6192-c151-44c4-b41d-a55fd064b010%22; _fbp=fb.1.1651067258648.721839719; _scid=9777248c-61ea-4afe-a375-f57ca03e1f1a; _sctr=1|1651032000000; _hjSessionUser_1872245=eyJpZCI6IjdkNjA1ZjU1LTM5NTUtNWY3NC04MTc5LWI5MDNlYzk4YjQxYiIsImNyZWF0ZWQiOjE2NTEwNjcyNTg0NzgsImV4aXN0aW5nIjp0cnVlfQ==; mp_e122ede888c6450cca846be617cd90e2_mixpanel=%7B%22distinct_id%22%3A%20%22google-oauth2%7C102480543104893058177%22%2C%22%24device_id%22%3A%20%221806b47041a92a-0a5fe78ad65d74-53580614-1ea000-1806b47041bcc1%22%2C%22mp_lib%22%3A%20%22Segment%3A%20web%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fnbatopshot.com%2Fchallenges%2Fba2ea2b4-5cc2-4f6f-a5d1-d639f6a0520c%22%2C%22%24initial_referring_domain%22%3A%20%22nbatopshot.com%22%2C%22%24user_id%22%3A%20%22google-oauth2%7C102480543104893058177%22%2C%22mp_name_tag%22%3A%20%22google-oauth2%7C102480543104893058177%22%2C%22destinationTrackingPreferences%22%3A%20%7B%22Customer.io%22%3A%20true%2C%22Google%20Analytics%22%3A%20true%2C%22Google%20Tag%20Manager%22%3A%20true%2C%22Hotjar%22%3A%20true%2C%22Mixpanel%22%3A%20true%7D%2C%22customTrackingPreferences%22%3A%20%7B%22advertising%22%3A%20true%2C%22marketingAndAnalytics%22%3A%20true%2C%22functional%22%3A%20true%7D%2C%22hasMetamask%22%3A%20false%2C%22id%22%3A%20%22google-oauth2%7C102480543104893058177%22%2C%22__mps%22%3A%20%7B%7D%2C%22__mpso%22%3A%20%7B%7D%2C%22__mpus%22%3A%20%7B%7D%2C%22__mpa%22%3A%20%7B%7D%2C%22__mpu%22%3A%20%7B%7D%2C%22__mpr%22%3A%20%5B%5D%2C%22__mpap%22%3A%20%5B%5D%7D; _ga=GA1.1.1750865028.1650331344; _ga_KJ4B3Q0WGV=GS1.1.1655751130.2.1.1655751168.0; sid=e3fdcdb9-49f5-4a36-a234-43bd9ea4c8d5; ts:s0=1Fe26.2**72ff77cebf8f816f2412659cebe17451af8938ade885a5a5f39e98934ef90849*yttU4Q1apZw8cd0djTMxwA*jNQiNAFphFv0tksGsz7nOseaRiJ2YJ4rCxSdhJS5T9v4KLziR6uMO6z1LmlnkYnbttDOA56PVDId9MTjmbfbGo26gyGOcX2Hh0Tj5BeKno9jTn6W-kZEIeDjZ-k4eiGgiRqd-JOwWZr_VN5CkyYw_vpROvRmkW89p_85YUYK5fejMitlj77XXz6neVFsiRt_NaqJhQQlDaUo7VED4fvBPqdh5nbgnlUcw38lFcktHmu1lcmPM2W-okSYa_CRrrNPtQ0e8yC8_nAIWCQI0ctqDHRY3CDIpQ81J5m4T_AzV6OetznqRSKyfl6mvYjcmR7LTPRjT4RJcYhWuP9og0mCYmNa-IfnihLG-TCfLrC270xWh94Jm1pCBjms7RtAForbELuF-z3Ee-4TdZALwqp4GmeUTqlM4crPv078pzmMo5BnnLPvHTbXViaOFApOtp-KvAzhK7XjqgFRMC-lWpcGNDUossElPaCDiHXksem8Pdeupvlp1GoB2G1OZ6ZSrRnqPm4BoAfzoInrLDfS-5v9_sdsrfeOawIP68yh0JdLaZWNhptTpqu92e3ln3TjjGbOq8trJfmIJyK2dSCPVjimWbEwPze-2WLVSBrfIOxHD2gAUjDGAJD2R03rX4UpJ__0GjgGEkzxv23Ip-3PLdL1tExfbER05JWwQlF4KO3b6D6hCc0EQtcLQapRWQ86WzhiGnE5nuv0ImB7S6rOKx75PUSOMzIB4ysktfFac3ZFw8WZJllVISD-nQ3Zk90FCmzcvGpIm7Y28DSo0X_rJQMfR-Ls59hgi-BFEhos3IfIcAl3rihf-Pebc-sygUHo8KQPbX7f4UsEbPk9PWF_avxd8CPvrhYoD2vggTEivAdyiU5hWwK8xx-wiQRN675L-11REv6HF3spuGunU2ZZYfJ1GrQU55wXSWdSwAWwzZjXM0h45s8gos90BzgBnPQgeM_FY8Mr_YJBhhSkQhMgwJdujer6KgucgX-5PvLZAXjjLuIYR_353WA373tV2s5NpCSVNKGKMIbyk_hXAs5JgkK4gzDaTlsTxD79ee4cZnsxlFNrCbA33-UGJRRvN46okJeevSxSECxbWAxMhVFUw--QpeeRxmg1cNAwd5p9Wu4QRPazLblOf3AZVWpTUqe1VAeeuLiV9Xnork02rAnJQwYS2LAqVcTWzu4P2SKzSA2pSY-ZvvV4P-cUxzo3lmaB3CPu9jiG4fk_WYUOUhROexRTOQpR9FNKYoW7UxG7r58sf2g49XJc58chq3b0dG3-KOlhnvZtI1Vh2iU5iZLkixmdH-wOEThEr_VcUWuSsJo2P3ipUPmj_VjoDMsbfmVXJiHgrZtZQom_oyJ4ID; ts:s1=B1dH1zjJbBKooNTOS_WR5MrRVapDF8rEoJnu98jHc_j9nRX0djZ0NLtxLZQf5CWqS02OdxnYJm_hu3Po0VqF1t9wF1VAoINrxyMdy0IZiRcqGgveRnD55hqrDw2lvQoj7Y7hMMcvdDfJ4OpNakEfOtGu-NwXgrakBBed5RUC_tSeZ1l2-GF4iHURh-_czyuipc-3pi_8Hcim_Q2GXPf_bC9xjYE73OAqokvMVB9hWkI53Nt4bmya9YwlDEkttUAno2IyUqMKki0RoERU_E5GIVRSdFqyILdhNDOW2h6AqKZXGjs1w54kn3VTmGssuDy6t-R2gSY5zQe2NBwRKGz8zsRgAlNlA_3eWjAWrcrsx0dQc5YfYL8p0Ya_dJOt-oBnjKCLh3jQUdfwYwavIgoCHSJ-jpXUraVzRRZWBVZeQIiJKN80sIems1Xr1FXpe-BCqfJA92hQHF_jFfqyuj2Q_9HHFpAzf0RwtZBaBlQoNPt8MyG_8hjvRSB10a3EYd1grvVLz6Gle5dvnSzHdP67w6TgYjQT7rXQjnmA-_kpqeT_pNPCxYej4XEmlAtF6t3rvWVbnnV207eSatfu95UqeazHNrP7NA3qgtvl_nxlzcw2c0LnlBzNi45iHuJ3xcQknHGCdogzY0lNDeHzYW72rIXore1xcGHSPfbMeyereUVu1kAj2ImaKOzSaQBmLOAkCzZfVZ2h7bfuoCENJ__zBTbhP9N4e-YlOSjIaDf3fZ58GqOEZIwlYa5mPZCaRtbv6QvzZ-quQlbbKE1JvmBZai2QTr5EnsmsAtwKQN4uGA2mmILJkctvesk6OjRXmN129d6-v1T02dobYWlb_UTtN77p8w0dkmwqQxJXr3tMSpvkAHmO8HzrXBLbDg-EMjbj9reR6z-ghmtRBMNKUIVW6MOtff5ipbj-Tr5HdAXhUH6P7GYT6c**4bf028f4637ea489410f8db58eb6a7314a80a3248a20960647b3eb5290c4514b*5plSbzHUZkXv2UHNxXXFANx5zzVRGceGGMVU1UKz0ac; __cf_bm=gkm9hlMZ6jA28k6Ty7QvLbvPxnFxhM.74hPbOegaWy8-1656118666-0-AepqB+gNLkEUurgEUlPWL54K7/IGw+EX9C1sCRCTXdC/EIMLwY59U/kGWwImQnzwUjFfLSTTBmaqPILfdr+nzHWTJ4RWT/IGkcdevXLZPReZd3gh7SknYBeNQZoRJ9LGcw==',
          Referer:
            'https://nbatopshot.com/listings/p2p/208ae30a-a4fe-42d4-9e51-e6fd1ad2a7a9+1211bd75-ff7d-4af4-95d7-adce6bab480b',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
        },
        body: JSON.stringify({
          operationName: 'SearchMintedMomentsForSerialNumberModal',
          variables: {
            sortBy: 'SERIAL_NUMBER_DESC' || 'RARITY_DESC',
            byOwnerDapperID: null,
            bySets: ['208ae30a-a4fe-42d4-9e51-e6fd1ad2a7a9'],
            bySetVisuals: null,
            byPlayers: null,
            byPlays: ['1211bd75-ff7d-4af4-95d7-adce6bab480b'],
            byTeams: null,
            byForSale: null,
            searchInput: {
              pagination: {
                cursor: rightCursor,
                direction: 'RIGHT',
                limit: 20,
              },
            },
          },
          query:
            'query SearchMintedMomentsForSerialNumberModal($sortBy: MintedMomentSortType, $byOwnerDapperID: [String], $bySets: [ID], $bySetVisuals: [VisualIdType], $byPlayers: [ID], $byPlays: [ID], $byTeams: [ID], $byForSale: ForSaleFilter, $searchInput: BaseSearchInput!) {\n  searchMintedMoments(input: {sortBy: $sortBy, filters: {byOwnerDapperID: $byOwnerDapperID, bySets: $bySets, bySetVisuals: $bySetVisuals, byPlayers: $byPlayers, byPlays: $byPlays, byTeams: $byTeams, byForSale: $byForSale}, searchInput: $searchInput}) {\n    data {\n      sortBy\n      filters {\n        byOwnerDapperID\n        bySets\n        bySetVisuals\n        byPlayers\n        byPlays\n        byTeams\n        byForSale\n        __typename\n      }\n      searchSummary {\n        pagination {\n          leftCursor\n          rightCursor\n          __typename\n        }\n        data {\n          ... on MintedMoments {\n            size\n            data {\n              ...MomentDetails\n              packListingID\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment MomentDetails on MintedMoment {\n  id\n  version\n  sortID\n  tier\n  tags {\n    ...TagsFragment\n    __typename\n  }\n  set {\n    id\n    flowName\n    flowSeriesNumber\n    setVisualId\n    __typename\n  }\n  setPlay {\n    ID\n    flowRetired\n    tags {\n      ...TagsFragment\n      __typename\n    }\n    circulations {\n      ...CirculationsFragment\n      __typename\n    }\n    __typename\n  }\n  assetPathPrefix\n  play {\n    id\n    stats {\n      playerID\n      playerName\n      firstName\n      lastName\n      primaryPosition\n      teamAtMomentNbaId\n      teamAtMoment\n      dateOfMoment\n      playCategory\n      jerseyNumber\n      nbaSeason\n      __typename\n    }\n    tags {\n      ...TagsFragment\n      __typename\n    }\n    league\n    __typename\n  }\n  price\n  listingOrderID\n  flowId\n  owner {\n    ...UserDetailsFragment\n    __typename\n  }\n  ownerV2 {\n    ...UserDetailsFragment\n    ...NonCustodialUserFragment\n    __typename\n  }\n  flowSerialNumber\n  forSale\n  userListingID\n  destroyedAt\n  acquiredAt\n  topshotScore {\n    score\n    derivedVia\n    calculatedAt\n    averageSalePrice\n    __typename\n  }\n  lastPurchasePrice\n  __typename\n}\n\nfragment TagsFragment on Tag {\n  id\n  title\n  visible\n  level\n  __typename\n}\n\nfragment CirculationsFragment on SetPlayCirculations {\n  burned\n  circulationCount\n  forSaleByCollectors\n  hiddenInPacks\n  ownedByCollectors\n  unavailableForPurchase\n  __typename\n}\n\nfragment UserDetailsFragment on User {\n  dapperID\n  username\n  profileImageUrl\n  __typename\n}\n\nfragment NonCustodialUserFragment on NonCustodialUser {\n  flowAddress\n  __typename\n}\n',
        }),
        method: 'POST',
      },
    );
    try {
      if (retry) {
        console.log(await resp.text());
        return;
      }

      const body = await resp.json();

      const {
        data: { data },
        pagination,
      } = body.data.searchMintedMoments.data.searchSummary;
      const targetMoment = data.find(
        (moment) => moment.flowSerialNumber === targetSerial,
      );

      if (targetMoment) {
        console.log('MMENT FOUND', targetMoment, getUrl(targetMoment));
        return;
      }

      console.log(
        'DID NOT FIND IT, checking',
        rightCursor,
        'next. did find',
        data[0],
        'and\n',
        pagination,
      );

      getData(targetSerial, pagination.rightCursor);
    } catch (err) {
      console.error('ERR sometime at or after json call', err);
      console.log('HMM?', resp.status, resp.statusText);
      getData(targetSerial, rightCursor, { retry: true });
    }
  };

  try {
    await getData(
      '33339',
      'CiYKJGIwNzNmY2M4LTJjMDItNDhhYy05OTkxLTRkNjViZTU2MTUxZRACOggKBAjEjAIQAg==',
    );
  } catch (err) {
    console.error('OH NO', err);
  }
})();
